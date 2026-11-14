import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export const ListPropertySection: React.FC = () => {
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Villa');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ownerName.trim() || ownerName.trim().length < 2) {
      setErrorMsg('Please enter the property owner’s full name.');
      return;
    }
    if (!/^[+\d\s()-]{8,}$/.test(phone)) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please specify the property location or corridor.');
      return;
    }
    if (!expectedPrice.trim()) {
      setErrorMsg('Please indicate your expected asking price or monthly rent.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="list-property" className="py-20 sm:py-28 bg-[#101B2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Private Representation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              READY TO SELL OR RENT YOUR PROPERTY?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              Connect with our team and showcase your property to potential buyers and tenants.
            </p>

            <div className="space-y-4 border-t border-white/15 pt-6 text-sm text-white/75">
              <div>
                <span className="text-[#C9A66B] font-semibold block">Architectural Photography &amp; Styling</span>
                Editorial presentation tailored for discerning domestic and NRI buyers.
              </div>
              <div>
                <span className="text-[#C9A66B] font-semibold block">Qualified Private Viewings</span>
                Pre-vetted appointments handled confidentially by senior partners.
              </div>
              <div>
                <span className="text-[#C9A66B] font-semibold block">Valuation &amp; Legal Guidance</span>
                Data-backed pricing benchmarks across Ahmedabad &amp; Gandhinagar.
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#182A43] border border-[#C9A66B]/30 p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C9A66B] mx-auto" />
                <h3 className="font-serif text-3xl font-semibold text-white">
                  Submission Preview Confirmed
                </h3>
                <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                  Thank you, {ownerName}. Your {propertyType} submission in {location} ({expectedPrice}) has been validated. This is a frontend demonstration preview—no live backend submission occurred.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setOwnerName('');
                    setPhone('');
                    setEmail('');
                    setLocation('');
                    setExpectedPrice('');
                    setDescription('');
                  }}
                  className="px-6 py-3 bg-[#C9A66B] text-[#101B2D] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#DFC391] transition-colors cursor-pointer"
                >
                  Submit Another Property
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errorMsg && (
                  <div className="p-3.5 bg-red-950/60 border border-red-400/50 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="owner-name"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Owner Name
                    </label>
                    <input
                      id="owner-name"
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="owner-phone"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="owner-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="owner-email"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="owner-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@domain.com"
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="owner-location"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Property Location
                    </label>
                    <input
                      id="owner-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Ambli-Bopal, Ahmedabad"
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="owner-type"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Property Type
                    </label>
                    <select
                      id="owner-type"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white focus:outline-none focus:border-[#C9A66B]"
                    >
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Premium House">Premium House</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="owner-price"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                    >
                      Expected Price
                    </label>
                    <input
                      id="owner-price"
                      type="text"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      placeholder="e.g. ₹3.5 Cr or ₹2.5 L/mo"
                      className="w-full h-11 px-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="owner-desc"
                    className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
                  >
                    Property Description
                  </label>
                  <textarea
                    id="owner-desc"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share area in Sq. Ft., bedrooms, architectural highlights, and possession timeline..."
                    className="w-full p-3.5 bg-[#101B2D] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A66B] hover:bg-[#DFC391] text-[#101B2D] text-xs font-semibold tracking-[0.12em] uppercase inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Property</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
