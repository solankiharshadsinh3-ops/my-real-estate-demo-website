import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Compass, RefreshCw } from 'lucide-react';

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

interface MarketInsightsData {
  topic: string;
  headline: string;
  summary: string;
  keyMetrics: MarketMetric[];
  trends: MarketTrendItem[];
  sources: GroundedSource[];
  updatedAt: string;
}

const TOPICS = [
  { key: 'overview', label: 'Market Overview' },
  { key: 'corridors', label: 'Sindhu Bhavan & Ambli' },
  { key: 'gift-city', label: 'GIFT City & Riverfront' },
  { key: 'nri-outlook', label: 'NRI & Yield Outlook' },
] as const;

export const MarketInsightsSection: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string>('overview');
  const [data, setData] = useState<MarketInsightsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchInsights = useCallback(async (topic: string, refresh = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/market-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, refresh }),
      });
      const json = (await res.json()) as MarketInsightsData & { error?: string };
      if (!res.ok) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }
      setData(json);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to retrieve live Ahmedabad market insights.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights(activeTopic, false);
  }, [activeTopic, fetchInsights]);

  const formattedTime = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <section id="market-insights" className="py-20 sm:py-28 bg-luxury-ivory-animated text-[#20252C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Ahmedabad Real Estate Intelligence · Google Search Grounded
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
              Market Insights
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fetchInsights(activeTopic, true)}
              disabled={loading}
              className="btn-lux-light px-4 py-2.5 border text-xs font-semibold tracking-[0.08em] uppercase inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C9A66B] btn-lux-icon-shift ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Updating Brief' : 'Refresh Brief'}</span>
            </button>
          </div>
        </div>

        {/* Topic Filter Segmented Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#101B2D]/12">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.key}
                type="button"
                onClick={() => setActiveTopic(topic.key)}
                className={`btn-lux-tab px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase whitespace-nowrap shrink-0 cursor-pointer border ${
                  activeTopic === topic.key
                    ? 'bg-[#101B2D] text-[#C9A66B] border-[#101B2D] shadow-sm'
                    : 'bg-white text-[#777E88] border-[#101B2D]/10 hover:text-[#101B2D] hover:border-[#C9A66B]/60 hover:bg-[#F7F1E5]/60'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {formattedTime && !loading && !error && (
            <span className="text-xs text-[#777E88] tabular-nums">
              Briefing retrieved {formattedTime}
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-8" aria-busy="true" aria-label="Loading Ahmedabad market insights">
            <div className="bg-white border border-[#101B2D]/10 p-8 animate-pulse space-y-4">
              <div className="h-3 w-40 bg-[#101B2D]/10" />
              <div className="h-8 w-3/4 bg-[#101B2D]/10" />
              <div className="h-4 w-full bg-[#101B2D]/8" />
              <div className="h-4 w-5/6 bg-[#101B2D]/8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#101B2D]/10 p-6 animate-pulse space-y-3"
                >
                  <div className="h-3 w-24 bg-[#101B2D]/10" />
                  <div className="h-7 w-32 bg-[#C9A66B]/25" />
                  <div className="h-3 w-full bg-[#101B2D]/8" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white border border-[#101B2D]/15 p-8 sm:p-10 text-center space-y-4">
            <Compass className="w-8 h-8 text-[#C9A66B] mx-auto" />
            <h3 className="font-serif text-2xl font-semibold text-[#101B2D]">
              Live Market Research Unavailable
            </h3>
            <p className="text-sm text-[#777E88] max-w-lg mx-auto leading-relaxed">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchInsights(activeTopic, true)}
              className="btn-lux-navy px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase cursor-pointer"
            >
              Retry Live Search
            </button>
          </div>
        )}

        {/* Loaded Editorial Intelligence View */}
        {!loading && !error && data && (
          <div className="space-y-8">
            {/* Lead Executive Brief + Key Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 bg-[#101B2D] text-white border border-[#C9A66B]/30 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C9A66B] block mb-3">
                    {TOPICS.find((t) => t.key === data.topic)?.label ?? 'Market Dispatch'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug mb-5">
                    {data.headline}
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                    {data.summary}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/65">
                  <span>Ahmedabad &amp; GIFT City Luxury Segment</span>
                  <span>Live Web Synthesis via Google Search</span>
                </div>
              </div>

              {/* 3 Key Market Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {(data.keyMetrics.length > 0
                  ? data.keyMetrics
                  : [
                      {
                        label: 'Primary Focus',
                        value: 'West Ahmedabad',
                        context: 'Sindhu Bhavan, Ambli-Bopal & Shilaj luxury corridors',
                      },
                    ]
                ).map((metric, idx) => (
                  <div
                    key={`${metric.label}-${idx}`}
                    className="flex-1 bg-white border border-[#101B2D]/10 p-5 sm:p-6 flex flex-col justify-center"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#777E88] mb-1">
                      {metric.label}
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#101B2D] tabular-nums mb-1">
                      {metric.value}
                    </div>
                    <p className="text-xs text-[#777E88] leading-relaxed">{metric.context}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Trend Breakdown Cards */}
            {data.trends.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {data.trends.map((trend, idx) => (
                  <article
                    key={`${trend.title}-${idx}`}
                    className="bg-white border border-[#101B2D]/10 hover:border-[#C9A66B]/60 transition-colors p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#777E88] mb-3">
                        <span className="font-serif text-lg font-semibold text-[#C9A66B]">
                          0{idx + 1}.
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#101B2D] font-medium">{trend.corridor}</span>
                      </div>
                      <h4 className="font-serif text-2xl font-semibold text-[#101B2D] leading-snug mb-3">
                        {trend.title}
                      </h4>
                      <p className="text-sm text-[#20252C]/80 leading-relaxed">
                        {trend.detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Grounded Sources Citation Strip */}
            {data.sources.length > 0 && (
              <div className="bg-white border border-[#101B2D]/10 px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#101B2D]">
                    Verified Search Sources
                  </span>
                  <span className="text-xs text-[#777E88]">
                    External publications referenced in this briefing
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                  {data.sources.map((src) => (
                    <a
                      key={src.uri}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#182A43] hover:text-[#C9A66B] transition-colors underline underline-offset-4"
                    >
                      <span className="truncate max-w-[260px]">{src.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#C9A66B]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
