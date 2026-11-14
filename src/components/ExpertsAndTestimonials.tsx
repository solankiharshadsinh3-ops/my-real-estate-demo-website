import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Quote,
  Star,
  X,
} from 'lucide-react';
import { ExpertConsultant, Testimonial } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';
import { SectionDivider } from './SectionDivider';

interface ExpertsAndTestimonialsProps {
  experts: ExpertConsultant[];
  testimonials: Testimonial[];
}

export const ExpertsAndTestimonials: React.FC<ExpertsAndTestimonialsProps> = ({
  experts,
  testimonials,
}) => {
  const [selectedExpert, setSelectedExpert] = useState<ExpertConsultant | null>(null);
  const [expertFormSent, setExpertFormSent] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNote, setClientNote] = useState('');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const currentTestimonial = testimonials[testimonialIdx];

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) return;
    setExpertFormSent(true);
  };

  return (
    <>
      {/* Our Real Estate Experts */}
      <section id="experts" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
                Private Client Advisory
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
                Our Real Estate Experts
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#777E88] max-w-md leading-relaxed">
              Senior property partners combining deep local zoning knowledge, off-market access, and discreet representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <article
                key={expert.id}
                className="group bg-[#F7F6F2] border border-[#101B2D]/10 hover:border-[#C9A66B]/60 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#101B2D]">
                  <ResilientImage
                    src={expert.image}
                    alt={`${expert.name} - ${expert.designation}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C9A66B] block mb-1">
                      {expert.experience}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                      {expert.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#101B2D] mb-2">
                      {expert.designation}
                    </p>
                    <p className="text-xs text-[#C9A66B] font-medium mb-3">
                      {expert.specialization}
                    </p>
                    <p className="text-sm text-[#20252C]/80 leading-relaxed mb-6">
                      {expert.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#101B2D]/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedExpert(expert);
                        setExpertFormSent(false);
                        setClientNote(
                          `Hello ${expert.name}, I would like to schedule a confidential property consultation.`
                        );
                      }}
                      className="btn-lux-navy px-4 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase cursor-pointer"
                    >
                      Contact Advisor
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${expert.name} LinkedIn`}
                        className="btn-lux-icon w-9 h-9 border border-[#101B2D]/15 bg-white flex items-center justify-center text-[#101B2D] hover:border-[#C9A66B] hover:bg-[#101B2D] hover:text-[#C9A66B]"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${expert.name}`}
                        className="btn-lux-icon w-9 h-9 border border-[#101B2D]/15 bg-white flex items-center justify-center text-[#101B2D] hover:border-[#C9A66B] hover:bg-[#101B2D] hover:text-[#C9A66B]"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="navy-gold-wave" topBg="#FFFFFF" bottomBg="#F7F6F2" />

      {/* Client Testimonials Carousel */}
      <section id="testimonials" className="py-20 sm:py-24 bg-[#F7F6F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Sample Demo Testimonials
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
              Client Perspectives
            </h2>
            <p className="text-xs text-[#777E88] mt-2">
              Illustrative fictional sample client reviews created for demonstration purposes.
            </p>
          </div>

          {currentTestimonial && (
            <div className="relative bg-white border border-[#101B2D]/10 p-7 sm:p-12 shadow-sm">
              <Quote className="w-10 h-10 text-[#C9A66B]/30 mb-6" />

              <p className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#101B2D] leading-relaxed mb-8">
                “{currentTestimonial.quote}”
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#101B2D]/10">
                <div className="flex items-center gap-4">
                  {/* Editorial Architectural Monogram Portrait */}
                  <div
                    className="w-14 h-14 bg-[#101B2D] border border-[#C9A66B] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="font-serif text-xl font-semibold text-[#C9A66B] tracking-wider">
                      {currentTestimonial.initials}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[#C9A66B] mb-1">
                      {Array.from({ length: currentTestimonial.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#101B2D]">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-xs text-[#777E88]">
                      {currentTestimonial.role} · {currentTestimonial.transactionType}:{' '}
                      <span className="text-[#101B2D] font-medium">
                        {currentTestimonial.propertyTitle}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      setTestimonialIdx(
                        (testimonialIdx - 1 + testimonials.length) % testimonials.length
                      )
                    }
                    aria-label="Previous testimonial"
                    className="btn-lux-icon w-10 h-10 border border-[#101B2D]/20 bg-white text-[#101B2D] hover:border-[#C9A66B] hover:bg-[#101B2D] hover:text-[#C9A66B] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-[#777E88] tabular-nums min-w-[40px] text-center">
                    {testimonialIdx + 1} / {testimonials.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                    className="btn-lux-icon w-10 h-10 border border-[#101B2D]/20 bg-white text-[#101B2D] hover:border-[#C9A66B] hover:bg-[#101B2D] hover:text-[#C9A66B] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Expert Modal */}
      {selectedExpert && (
        <div
          className="fixed inset-0 z-50 bg-[#101B2D]/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Contact ${selectedExpert.name}`}
        >
          <div className="w-full max-w-lg bg-white border border-[#C9A66B]/40 shadow-2xl overflow-hidden">
            <div className="bg-[#101B2D] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#C9A66B]">
                  Advisory Consultation
                </p>
                <h3 className="font-serif text-2xl font-semibold">{selectedExpert.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExpert(null)}
                aria-label="Close modal"
                className="btn-lux-icon w-9 h-9 bg-white/10 border border-white/15 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#101B2D] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-4 text-xs text-[#777E88] pb-4 border-b border-[#101B2D]/10">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                  {selectedExpert.phone} (Demo)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C9A66B]" />
                  {selectedExpert.email}
                </span>
              </div>

              {expertFormSent ? (
                <div className="py-6 text-center space-y-3">
                  <h4 className="font-serif text-2xl font-semibold text-[#101B2D]">
                    Consultation Request Logged
                  </h4>
                  <p className="text-sm text-[#777E88]">
                    Thank you, {clientName}. This is a simulated demo request for {selectedExpert.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert(null)}
                    className="btn-lux-navy px-6 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleExpertSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full h-11 px-3.5 border border-[#101B2D]/20 text-base sm:text-sm focus:outline-none focus:border-[#C9A66B]"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full h-11 px-3.5 border border-[#101B2D]/20 text-base sm:text-sm focus:outline-none focus:border-[#C9A66B]"
                  />
                  <textarea
                    rows={3}
                    value={clientNote}
                    onChange={(e) => setClientNote(e.target.value)}
                    className="w-full p-3.5 border border-[#101B2D]/20 text-base sm:text-sm focus:outline-none focus:border-[#C9A66B]"
                  />
                  <button
                    type="submit"
                    className="btn-lux-gold w-full py-3 text-xs font-semibold tracking-[0.1em] uppercase cursor-pointer"
                  >
                    Send Private Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
