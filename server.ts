import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

interface MarketMetric {
  label: string;
  value: string;
  context: string;
}

interface MarketTrendItem {
  title: string;
  corridor: string;
  detail: string;
}

interface GroundedSource {
  title: string;
  uri: string;
}

interface MarketInsightsPayload {
  topic: string;
  headline: string;
  summary: string;
  keyMetrics: MarketMetric[];
  trends: MarketTrendItem[];
  sources: GroundedSource[];
  updatedAt: string;
}

const TOPIC_PROMPTS: Record<string, { label: string; query: string }> = {
  overview: {
    label: 'Ahmedabad Luxury Overview',
    query:
      'Latest 2025-2026 luxury real estate market trends, residential price growth, ultra-luxury apartment and villa demand, and RERA/housing market momentum in Ahmedabad, Gujarat, India.',
  },
  corridors: {
    label: 'Sindhu Bhavan & Ambli-Bopal',
    query:
      'Latest luxury residential real estate price trends, new villa and penthouse launches, and infrastructure developments on Sindhu Bhavan Road, Ambli-Bopal Road, and SG Highway in Ahmedabad.',
  },
  'gift-city': {
    label: 'GIFT City & Riverfront',
    query:
      'Latest 2025-2026 commercial and luxury residential real estate investment trends in GIFT City Gandhinagar and Sabarmati Riverfront Ahmedabad, including corporate leasing and residential demand.',
  },
  'nri-outlook': {
    label: 'NRI & Yield Outlook',
    query:
      'Latest NRI luxury real estate investment trends, rental yields, and capital appreciation outlook in Ahmedabad residential and commercial property market.',
  },
};

const CACHE_TTL_MS = 10 * 60 * 1000;
const insightsCache = new Map<string, { expiresAt: number; data: MarketInsightsPayload }>();

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function parseInsightsJson(rawText: string, topicKey: string): Omit<MarketInsightsPayload, 'sources' | 'updatedAt' | 'topic'> {
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  const candidate = startIdx !== -1 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;

  try {
    const parsed = JSON.parse(candidate) as Partial<MarketInsightsPayload>;
    return {
      headline:
        typeof parsed.headline === 'string' && parsed.headline.trim()
          ? parsed.headline.trim()
          : `${TOPIC_PROMPTS[topicKey]?.label || 'Ahmedabad'} Market Brief`,
      summary:
        typeof parsed.summary === 'string' && parsed.summary.trim()
          ? parsed.summary.trim()
          : cleaned,
      keyMetrics: Array.isArray(parsed.keyMetrics) ? parsed.keyMetrics.slice(0, 3) : [],
      trends: Array.isArray(parsed.trends) ? parsed.trends.slice(0, 4) : [],
    };
  } catch {
    return {
      headline: `${TOPIC_PROMPTS[topicKey]?.label || 'Ahmedabad Luxury'} Market Brief`,
      summary: rawText.trim(),
      keyMetrics: [],
      trends: [],
    };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/market-insights', async (req, res) => {
    const rawTopic = typeof req.body?.topic === 'string' ? req.body.topic : 'overview';
    const topicKey = TOPIC_PROMPTS[rawTopic] ? rawTopic : 'overview';
    const forceRefresh = Boolean(req.body?.refresh);

    const cached = insightsCache.get(topicKey);
    if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
      res.json(cached.data);
      return;
    }

    try {
      const ai = getGeminiClient();
      const topicMeta = TOPIC_PROMPTS[topicKey];

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Research using Google Search and summarize: ${topicMeta.query}

Return ONLY a valid JSON object (no markdown fences, no commentary outside JSON) with this exact structure:
{
  "headline": "Short editorial headline (8-12 words) capturing the primary trend",
  "summary": "2-3 concise, authoritative editorial sentences summarizing current verified market conditions in Ahmedabad.",
  "keyMetrics": [
    { "label": "Metric name (2-4 words)", "value": "Short figure or range (e.g., 8–12% YoY or ₹11,500+/sq.ft)", "context": "1-line verified context with location/period" },
    { "label": "Metric name", "value": "Short figure or range", "context": "1-line context" },
    { "label": "Metric name", "value": "Short figure or range", "context": "1-line context" }
  ],
  "trends": [
    { "title": "Concise trend title", "corridor": "Ahmedabad corridor or segment", "detail": "2 concise sentences grounded in recent search findings." },
    { "title": "Concise trend title", "corridor": "Ahmedabad corridor or segment", "detail": "2 concise sentences grounded in recent search findings." },
    { "title": "Concise trend title", "corridor": "Ahmedabad corridor or segment", "detail": "2 concise sentences grounded in recent search findings." }
  ]
}`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction:
            'You are a senior luxury real estate market analyst writing for ELITE ESTATES in Ahmedabad. Ground every figure, corridor name, and trend strictly in live Google Search results. Maintain a refined, factual, editorial tone without hype.',
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.status(502).json({ error: 'No market insights content returned by the research service.' });
        return;
      }

      const structured = parseInsightsJson(rawText, topicKey);

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const seenUris = new Set<string>();
      const sources: GroundedSource[] = [];

      for (const chunk of chunks) {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title;
        if (uri && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            title: title?.trim() || new URL(uri).hostname.replace(/^www\./, ''),
            uri,
          });
        }
      }

      const payload: MarketInsightsPayload = {
        topic: topicKey,
        headline: structured.headline,
        summary: structured.summary,
        keyMetrics: structured.keyMetrics,
        trends: structured.trends,
        sources: sources.slice(0, 6),
        updatedAt: new Date().toISOString(),
      };

      insightsCache.set(topicKey, {
        expiresAt: Date.now() + CACHE_TTL_MS,
        data: payload,
      });

      res.json(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      if (message === 'MISSING_API_KEY') {
        res.status(503).json({
          error:
            'Gemini API key is not configured in server secrets. Please set GEMINI_API_KEY in Settings > Secrets to enable live Google Search market insights.',
        });
        return;
      }
      console.error('Market insights API error:', err);
      res.status(500).json({
        error: 'Unable to fetch live Ahmedabad luxury market insights at the moment. Please try again.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ELITE ESTATES server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
