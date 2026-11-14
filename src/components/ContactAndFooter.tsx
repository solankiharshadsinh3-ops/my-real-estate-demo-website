import React, { useEffect, useState } from 'react';
import {
  Check,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import { BrandMark } from './BrandMark';
import { ListingTransaction, PropertyCategory } from '../types/realEstate';

interface ContactAndFooterProps {
  preselectedSubject?: string;
  onQuickFilter: (opts: { transaction?: 'All' | ListingTransaction; category?: 'All' | PropertyCategory; location?: string }) => void;
  onNavigateSection: (sectionId: string) => void;
}

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: Linkedin },
  { name: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube },
  { name: 'WhatsApp', href: 'https://wa.me/919876543210', Icon: MessageCircle },
  { name: 'X', href: 'https://x.com/', Icon: Twitter },
];

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  preselectedSubject = '',
  onQuickFilter,
  onNavigateSection,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    if (preselectedSubject) {
      setMessage(`Please share the complete dossier and private viewing slots for ${preselectedSubject}.`);
      setContactSent(false);
    }
  }, [preselectedSubject]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!name.trim() || name.trim().length < 2) {
      setContactError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError('Please enter a valid email address.');
      return;
    }
    if (!/^[+\d\s()-]{8,}$/.test(phone)) {
      setContactError('Please enter a valid phone number.');
      return;
    }
    if (!message.trim()) {
      setContactError('Please enter your message.');
      return;
    }
    setContactSent(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError('Enter a valid email address.');
      return;
    }
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <>
      {/* Contact & Location Section */}
      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
                Private Lounge &amp; Consultation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
                Contact &amp; Ahmedabad Office
              </h2>
            </div>
            <p className="text-xs text-[#777E88] max-w-sm">
              Note: Office address, phone, and email details below are fictional placeholder data for this portfolio demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left: Office Details + Map Preview */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6 bg-[#F7F6F2] border border-[#101B2D]/10 p-6 sm:p-8">
              <div className="space-y-5">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#101B2D]">
                  ELITE ESTATES Flagship Lounge
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-[#101B2D] block">Office Address (Demo)</span>
                      <span className="text-[#777E88] leading-relaxed">
                        Level 9, Aurelia Corporate Atrium, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-[#101B2D] block">Business Hours</span>
                      <span className="text-[#777E88] leading-relaxed">
                        Mon – Sat: 10:00 AM – 7:30 PM<br />
                        Sun: Private Appointments
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-[#101B2D] block">Telephone (Demo)</span>
                      <span className="text-[#777E88] tabular-nums">+91 98765 43210</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-[#101B2D] block">Advisory Desk (Demo)</span>
                      <span className="text-[#777E88]">concierge@eliteestates-demo.example</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="tel:+919876543210"
                    className="px-4 py-2.5 bg-[#101B2D] text-white hover:bg-[#182A43] text-xs font-semibold tracking-[0.08em] uppercase inline-flex items-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#C9A66B] text-[#101B2D] hover:bg-[#DFC391] text-xs font-semibold tracking-[0.08em] uppercase inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Sindhu+Bhavan+Road+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 border border-[#101B2D]/20 text-[#101B2D] hover:border-[#C9A66B] text-xs font-semibold tracking-[0.08em] uppercase inline-flex items-center gap-2 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Architectural Map Preview of Sindhu Bhavan Road, Ahmedabad */}
              <div className="relative h-56 w-full bg-[#101B2D] border border-[#101B2D]/20 overflow-hidden">
                <svg viewBox="0 0 640 240" className="w-full h-full opacity-60" aria-hidden="true">
                  <defs>
                    <pattern id="office-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                      <path
                        d="M 36 0 L 0 0 0 36"
                        fill="none"
                        stroke="#C9A66B"
                        strokeOpacity="0.22"
                        strokeWidth="0.7"
                      />
                    </pattern>
                  </defs>
                  <rect width="640" height="240" fill="url(#office-grid)" />
                  <path d="M0 120 L640 120" stroke="#C9A66B" strokeOpacity="0.65" strokeWidth="3" />
                  <path d="M440 0 L420 240" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2.5" />
                  <path d="M160 0 L175 240" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.5" />
                  <text x="28" y="108" fill="#C9A66B" fontSize="10" letterSpacing="2">
                    SINDHU BHAVAN ROAD
                  </text>
                  <text x="452" y="34" fill="#FFFFFF" fillOpacity="0.65" fontSize="10" letterSpacing="1.5">
                    SG HIGHWAY
                  </text>
                </svg>

                <div className="absolute left-[46%] top-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="px-3 py-1 bg-[#C9A66B] text-[#101B2D] text-[11px] font-semibold tracking-wider uppercase shadow-lg mb-1.5">
                    ELITE ESTATES Lounge
                  </span>
                  <span className="w-4 h-4 bg-[#C9A66B] border-2 border-white rotate-45 shadow-md" />
                </div>

                <div className="absolute bottom-3 left-3 bg-[#101B2D]/90 px-3 py-1 text-[11px] text-white/80 border border-white/15">
                  Bodakdev · Ahmedabad, Gujarat (Illustrative Map Preview)
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-6 bg-[#101B2D] text-white border border-[#C9A66B]/30 p-6 sm:p-10 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C9A66B] mb-2">
                Direct Inquiry
              </p>
              <h3 className="font-serif text-3xl font-semibold text-white mb-6">
                Connect With Our Consultants
              </h3>

              {contactSent ? (
                <div className="bg-[#182A43] border border-[#C9A66B]/40 p-8 text-center space-y-4">
                  <div className="w-11 h-11 bg-[#C9A66B] text-[#101B2D] mx-auto flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-2xl font-semibold">Demo Message Received</h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Thank you, {name}. Your inquiry has been recorded in this frontend demonstration.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSent(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#C9A66B] text-[#101B2D] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                  {contactError && (
                    <div className="p-3 bg-red-950/60 border border-red-400/50 text-xs text-red-200">
                      {contactError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1.5">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1.5">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your preferred location, budget, or property requirements..."
                      className="w-full p-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#C9A66B] hover:bg-[#DFC391] text-[#101B2D] text-xs font-semibold tracking-[0.12em] uppercase inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Column Luxury Footer */}
      <footer className="bg-[#101B2D] text-white border-t border-[#C9A66B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-4 space-y-5">
              <BrandMark light />
              <p className="text-sm text-white/75 leading-relaxed max-w-sm">
                Discover Spaces. Experience Excellence. Curating distinguished residences, penthouses, and commercial landmarks across Ahmedabad, Gandhinagar, and Mumbai.
              </p>

              {/* Social Media Integration */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {SOCIAL_LINKS.map(({ name: socialName, href, Icon }) => (
                  <a
                    key={socialName}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialName}
                    className="w-10 h-10 border border-white/15 bg-[#182A43]/60 text-white/85 hover:border-[#C9A66B] hover:text-[#C9A66B] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-serif text-lg font-semibold text-[#C9A66B] mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-white/75">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'Properties', id: 'properties' },
                  { label: 'Exclusive Projects', id: 'projects' },
                  { label: 'Virtual Tour', id: 'virtual-tour' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Contact', id: 'contact' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateSection(link.id)}
                      className="hover:text-[#C9A66B] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Categories */}
            <div className="lg:col-span-2">
              <h4 className="font-serif text-lg font-semibold text-[#C9A66B] mb-4">Categories</h4>
              <ul className="space-y-2.5 text-sm text-white/75">
                {(
                  [
                    'Luxury Villas',
                    'Apartments',
                    'Penthouses',
                    'Commercial Spaces',
                    'Residential Plots',
                    'Premium Houses',
                  ] as PropertyCategory[]
                ).map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => onQuickFilter({ category: cat, transaction: 'All' })}
                      className="hover:text-[#C9A66B] transition-colors text-left cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Locations & Newsletter */}
            <div className="lg:col-span-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#C9A66B] mb-3">Locations</h4>
                  <ul className="space-y-2 text-sm text-white/75">
                    {['Sindhu Bhavan', 'Ambli-Bopal', 'Gandhinagar', 'Mumbai'].map((loc) => (
                      <li key={loc}>
                        <button
                          type="button"
                          onClick={() => onQuickFilter({ location: loc })}
                          className="hover:text-[#C9A66B] transition-colors cursor-pointer"
                        >
                          {loc}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#C9A66B] mb-3">Contact (Demo)</h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054<br />
                    +91 98765 43210<br />
                    concierge@eliteestates-demo.example
                  </p>
                </div>
              </div>

              {/* Newsletter Subscription UI */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-serif text-lg font-semibold text-white mb-2">
                  Private Market Dispatch
                </h4>
                <p className="text-xs text-white/65 mb-3">
                  Receive curated off-market estate previews (demo UI).
                </p>
                {newsletterSuccess ? (
                  <div className="text-xs text-[#C9A66B] py-2">
                    Subscribed to demo market dispatch.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2" noValidate>
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      aria-label="Newsletter email address"
                      className="flex-1 min-w-0 h-10 px-3 bg-[#182A43] border border-white/15 text-xs text-white placeholder:text-white/45 focus:outline-none focus:border-[#C9A66B]"
                    />
                    <button
                      type="submit"
                      className="px-4 h-10 bg-[#C9A66B] hover:bg-[#DFC391] text-[#101B2D] text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Join
                    </button>
                  </form>
                )}
                {newsletterError && (
                  <p className="text-[11px] text-red-300 mt-1.5">{newsletterError}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Portfolio Attribution Bar */}
        <div className="border-t border-white/10 bg-[#0B1320] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65 text-center sm:text-left">
            <p>© 2026 ELITE ESTATES. All Rights Reserved. (Fictional Portfolio Demo)</p>
            <p>
              Website Designed &amp; Developed by{' '}
              <a
                href="https://www.instagram.com/digweb___expert___18/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A66B] font-semibold hover:text-[#DFC391] underline underline-offset-4 transition-colors"
              >
                DIGWEB EXPERT
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
