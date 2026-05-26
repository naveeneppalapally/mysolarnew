import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Shield, Navigation } from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, sectionViewport } from '../lib/animations';

const MAP_LEVELS = [
  { img: '/map_telangana.png', label: 'Telangana', sub: 'Regional Coverage' },
  { img: '/map_hyderabad.png', label: 'Hyderabad', sub: 'Metro & Suburbs' },
  { img: '/map_hayathnagar.png', label: 'Hayathnagar', sub: 'Hayathnagar Depot Region' },
  { img: '/map_office.png', label: 'Office Suite', sub: 'beside Union Bank' },
] as const;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeZoom, setActiveZoom] = useState(0);


  // Preload all map images
  useEffect(() => {
    MAP_LEVELS.forEach((level) => {
      const img = new Image();
      img.src = level.img;
    });
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    monthlyBill: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    'w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 placeholder:text-solar-text-dim border focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623]';

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: 'var(--solar-bg)' }}>
      <div className="section-wrapper pb-24 sm:pb-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          {/* ── Heading ── */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <p className="section-label">Contact Us</p>
            <h2 className="section-heading">
              Start Saving Today
            </h2>
            <p className="section-subheading mx-auto">
              Free site visit. We respond within 2 hours.
            </p>
          </motion.div>

          {/* ── Two-column Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* LEFT — Contact Form */}
            <motion.div variants={slideInLeft}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-solar-text-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClasses}
                        style={{ background: 'var(--solar-card)', borderColor: 'var(--solar-border)', color: 'var(--solar-text)' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-solar-text-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Phone <span style={{ color: '#F5A623' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className={inputClasses}
                        style={{ background: 'var(--solar-card)', borderColor: 'var(--solar-border)', color: 'var(--solar-text)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-solar-text-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClasses}
                        style={{ background: 'var(--solar-card)', borderColor: 'var(--solar-border)', color: 'var(--solar-text)' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="monthlyBill" className="block text-solar-text-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Monthly Bill (₹)
                      </label>
                      <input
                        type="number"
                        id="monthlyBill"
                        name="monthlyBill"
                        value={formData.monthlyBill}
                        onChange={handleChange}
                        placeholder="e.g. 2500"
                        min="0"
                        className={inputClasses}
                        style={{ background: 'var(--solar-card)', borderColor: 'var(--solar-border)', color: 'var(--solar-text)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-solar-text-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific requirements..."
                      rows={3}
                      className={inputClasses + ' resize-none'}
                      style={{ background: 'var(--solar-card)', borderColor: 'var(--solar-border)', color: 'var(--solar-text)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="shimmer-btn w-full py-4 rounded-xl text-base font-semibold cursor-pointer"
                  >
                    Get Free Quote →
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[380px]"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(5,150,105,0.1)' }}>
                    <CheckCircle className="w-8 h-8 text-solar-emerald" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-solar-text mb-2">Thank You!</h3>
                  <p className="text-solar-text-muted text-base max-w-xs">
                    We'll call you within 2 hours to discuss your solar installation.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT — Contact Info */}
            <motion.div variants={slideInRight} className="space-y-4">
              {[
                {
                  icon: <MapPin className="w-4 h-4" />,
                  title: 'Office',
                  content: 'Ground Floor, Shop 4-9-180/5, Lecturers Colony, beside Union Bank of India, Hayathnagar, Hyderabad 501505',
                },
                {
                  icon: <Phone className="w-4 h-4" />,
                  title: 'Call / WhatsApp',
                  content: '+91 94939 36249',
                  href: 'tel:+919493936249',
                },
                {
                  icon: <Mail className="w-4 h-4" />,
                  title: 'Email',
                  content: 'solarsmart.energies@gmail.com',
                  href: 'mailto:solarsmart.energies@gmail.com',
                },
                {
                  icon: <Clock className="w-4 h-4" />,
                  title: 'Hours',
                  content: 'Mon–Sat: 10:00 AM – 8:00 PM',
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  title: 'GSTIN',
                  content: '36AFOFS9652M1ZY',
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-4 flex items-start gap-3.5 hover:!translate-y-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245,166,35,0.08)', color: '#F5A623' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-solar-text-muted font-medium uppercase tracking-wider mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-solar-text hover:text-[#F5A623] transition-colors font-body">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-solar-text font-body">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
         OFFICE VISIT SECTION — Ashram-style layout
         ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.65 }}
        className="mt-14 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center bg-solar-card/40 border border-solar-border rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Left Column: Address Details */}
          <div className="space-y-6">
            <span className="font-heading text-xs font-semibold tracking-[0.25em] text-solar-gold uppercase block">
              ✦ Visit Our Office ✦
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-solar-text tracking-tight leading-tight">
              MyHome Solar Headquarters
            </h3>
            <div className="space-y-4">
              <address className="not-italic font-body text-base text-solar-text-muted leading-relaxed">
                Ground Floor, Shop 4-9-180/5,<br />
                Lecturers Colony, beside Union Bank of India,<br />
                Hayathnagar, Ranga Reddy District,<br />
                <span className="font-semibold text-solar-text">Hyderabad, Telangana – 501505</span>
              </address>
              
              <div className="border-t border-solar-border pt-4 space-y-2.5">
                <p className="text-sm text-solar-text-muted font-body leading-relaxed">
                  <strong className="text-solar-text font-medium">Landmark:</strong> Beside Union Bank of India, Hayathnagar Depot
                </p>
                <p className="text-sm text-solar-text-muted font-body leading-relaxed">
                  <strong className="text-solar-text font-medium">Business Hours:</strong> Monday – Saturday: 10:00 AM – 8:00 PM
                </p>
              </div>
            </div>
            
            {/* Interactive Zoom Level Tabs */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-solar-text-dim block mb-3">Zoom Level / Maps</span>
              <div className="flex flex-wrap gap-2">
                {MAP_LEVELS.map((level, i) => (
                  <button
                    key={level.label}
                    onClick={() => setActiveZoom(i)}
                    onMouseEnter={() => setActiveZoom(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all duration-200 cursor-pointer ${
                      activeZoom === i
                        ? 'bg-solar-gold text-solar-bg shadow-sm'
                        : 'bg-solar-card border border-solar-border text-solar-text-muted hover:text-solar-text hover:border-solar-gold'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Ground+Floor,+Shop+4-9-180/5,+Lecturers+Colony,+beside+Union+Bank+of+India,+Hayathnagar,+Hyderabad+501505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-solar-gold/10 border border-solar-gold/30 text-solar-gold hover:bg-solar-gold hover:text-solar-bg px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full cursor-pointer font-heading shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                Open on Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Tabbed Interactive Zoom Map Visual Layout */}
          <div
            className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[380px] shadow-lg border border-solar-border bg-solar-bg-light/20 flex flex-col justify-end cursor-pointer"
            onClick={() => setActiveZoom((prev) => (prev + 1) % MAP_LEVELS.length)}
            onMouseEnter={() => setActiveZoom((prev) => (prev + 1) % MAP_LEVELS.length)}
          >
            
            {/* Ambient vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-[5]"
              style={{
                background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(10,10,10,0.5) 100%)',
              }}
            />

            {/* Dynamic Map Transition Container */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZoom}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1.02, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={MAP_LEVELS[activeZoom].img}
                    alt={`MyHome Solar - ${MAP_LEVELS[activeZoom].label}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Subtle dark gradient overlay at bottom of the map image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Map Labels Fading Transition */}
            <div className="absolute bottom-16 left-0 right-0 z-[7] text-center px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeZoom}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  <span className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide drop-shadow-md block leading-tight">
                    {MAP_LEVELS[activeZoom].label}
                  </span>
                  <span className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-solar-gold font-semibold drop-shadow block">
                    {MAP_LEVELS[activeZoom].sub}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Pill Navigation Buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3.5 z-[8] bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {MAP_LEVELS.map((level, i) => (
                <button
                  key={`dot-${level.label}`}
                  onClick={(e) => { e.stopPropagation(); setActiveZoom(i); }}
                  className="flex items-center justify-center w-3 h-3 group cursor-pointer border-none bg-transparent"
                  aria-label={`Zoom to ${level.label}`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === activeZoom
                        ? 'w-2.5 h-2.5 bg-solar-gold shadow-[0_0_8px_rgba(245,166,35,0.7)]'
                        : i < activeZoom
                        ? 'w-1.5 h-1.5 bg-solar-gold/60 group-hover:bg-solar-gold/90'
                        : 'w-1.5 h-1.5 bg-white/35 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;
