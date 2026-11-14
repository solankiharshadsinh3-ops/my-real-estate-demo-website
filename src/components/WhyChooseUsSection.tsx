import React, { useEffect, useRef, useState } from 'react';

interface CounterMetric {
  target: number;
  suffix: string;
  label: string;
}

const DEMO_METRICS: CounterMetric[] = [
  { target: 500, suffix: '+', label: 'Properties Listed' },
  { target: 350, suffix: '+', label: 'Happy Clients' },
  { target: 25, suffix: '+', label: 'Expert Consultants' },
  { target: 10, suffix: '+', label: 'Years of Experience' },
];

const VALUE_PILLARS = [
  {
    index: '01.',
    title: 'Expert Property Consultants',
    detail:
      'Dedicated residential and commercial specialists with deep market intelligence across Ahmedabad, Gandhinagar, and Mumbai.',
  },
  {
    index: '02.',
    title: 'Premium Property Selection',
    detail:
      'Every estate, penthouse, and corporate floor undergoes rigorous architectural, structural, and lifestyle curation.',
  },
  {
    index: '03.',
    title: 'Transparent Process',
    detail:
      'Clear title documentation, RERA alignment, and candid valuation benchmarks at every milestone of the transaction.',
  },
  {
    index: '04.',
    title: 'Personalized Assistance',
    detail:
      'Private chauffeur-driven property tours, bespoke interior consultations, and discreet family-office representation.',
  },
  {
    index: '05.',
    title: 'Exclusive Property Listings',
    detail:
      'Access off-market bungalows, pre-launch sky residences, and flagship commercial floors unavailable on public portals.',
  },
  {
    index: '06.',
    title: 'Professional Support',
    detail:
      'End-to-end legal coordination, NRI advisory, lease structuring, and post-handover estate management guidance.',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(DEMO_METRICS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          const duration = 1200;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            setCounts(DEMO_METRICS.map((m) => Math.round(m.target * eased)));
            if (elapsed < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-luxury-royal-animated text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              The ELITE ESTATES Standard
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              REAL ESTATE. REIMAGINED.
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              Headquartered in Ahmedabad, ELITE ESTATES bridges international architectural curation with trusted private-client advisory across Gujarat and Western India.
            </p>
            <p className="text-xs text-white/55 border-t border-white/10 pt-4">
              Note: Portfolio metrics below are fictional demonstration statistics created for this DIGWEB EXPERT showcase website.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            {VALUE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="pb-6 border-b border-white/15"
              >
                <span className="font-serif text-xl text-[#C9A66B] font-semibold block mb-2">
                  {pillar.index}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Demo Statistics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 bg-[#101B2D] border border-[#C9A66B]/30 p-7 sm:p-10">
          {DEMO_METRICS.map((metric, idx) => (
            <div key={metric.label} className="text-center sm:text-left">
              <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#C9A66B] tabular-nums mb-1">
                {counts[idx]}
                {metric.suffix}
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wider uppercase text-white/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
