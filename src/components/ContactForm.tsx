import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Navigation,
} from 'lucide-react';

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Facebook = ({ size = 24, ...props }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, ...props }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MAP_LEVELS = [
  { img: '/map_telangana.png', label: 'Telangana', sub: 'Regional Coverage', coords: { x: '53%', y: '54%' } },
  { img: '/map_hyderabad.png', label: 'Hyderabad', sub: 'Metro & Suburbs', coords: { x: '70%', y: '60%' } },
  { img: '/map_hayathnagar.png', label: 'Hayathnagar', sub: 'Hayathnagar Depot Region', coords: { x: '52%', y: '48%' } },
  { img: '/map_office.png', label: 'Office Suite', sub: 'beside Union Bank', coords: { x: '50%', y: '50%' } },
] as const;

interface FormData {
  name: string;
  phone: string;
  bill: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  bill: '',
  message: '',
};

const badges = [
  'TSREDCO Empanelled',
  'MNRE Empanelled (TSRE260875)',
  'TSSPDCL & TSNPDCL Approved',
  'PM Surya Ghar Registered',
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [activeZoom, setActiveZoom] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Preload all map images
  useEffect(() => {
    MAP_LEVELS.forEach((level) => {
      const img = new Image();
      img.src = level.img;
    });
  }, []);

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.trim()))
      errs.phone = 'Valid 10-digit phone required';
    if (!formData.bill.trim() || Number(formData.bill) <= 0)
      errs.bill = 'Enter your monthly bill';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #030712 0%, #070c17 50%, #030712 100%)',
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F59E0B, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-amber-500/30 text-amber-400 bg-amber-500/5 mb-6 font-heading">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Start Your{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Solar Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Get a free consultation and personalized quote
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-heading mb-1">
                MyHome Solar
              </h3>
              <p className="text-gray-500 text-sm">(Authorised Solar Vendor)</p>
            </div>

            <div className="space-y-5">
              <ContactRow icon={<MapPin size={18} />} label="Address">
                <span className="text-gray-300 text-sm leading-relaxed">
                  Ground floor, Shop No 4-9-180/5, Lectures Colony, Beside Union Bank of India, Hayathnagar, Hyderabad, Telangana 501505
                </span>
              </ContactRow>

              <ContactRow icon={<Phone size={18} />} label="Contact Numbers">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:9493936249"
                      className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                    >
                      +91 9493936249
                    </a>
                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">Primary & WhatsApp</span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
                    <a href="tel:9550130770" className="hover:text-amber-400 transition-colors">
                      9550130770 (Mr. Gopi)
                    </a>
                    <span>•</span>
                    <a href="tel:9951637624" className="hover:text-amber-400 transition-colors">
                      9951637624
                    </a>
                    <span>•</span>
                    <a href="tel:9603449393" className="hover:text-amber-400 transition-colors">
                      9603449393
                    </a>
                  </div>
                </div>
              </ContactRow>

              <ContactRow icon={<Mail size={18} />} label="Email">
                <a
                  href="mailto:solarsmart.energies@gmail.com"
                  className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
                >
                  solarsmart.energies@gmail.com
                </a>
              </ContactRow>

              <ContactRow icon={<FileText size={18} />} label="GSTIN & MNRE">
                <div className="flex flex-col gap-0.5 text-sm">
                  <span className="text-gray-300 font-mono">
                    GSTIN: 36AFOFS9652M1ZY
                  </span>
                  <span className="text-gray-400 text-xs font-mono">
                    MNRE ID: TSRE260875
                  </span>
                </div>
              </ContactRow>

              <ContactRow icon={<Globe size={18} />} label="Service Coverage">
                <span className="text-gray-300 text-sm">
                  Hyderabad, Mancherial, Rangareddy, and Medchal (Telangana only)
                </span>
              </ContactRow>

              <ContactRow icon={<Clock size={18} />} label="Hours">
                <span className="text-gray-300 text-sm">
                  Mon–Sat &nbsp;10:00 AM – 8:00 PM
                </span>
              </ContactRow>

              <ContactRow icon={<Facebook size={18} />} label="Social Profiles">
                <div className="flex items-center gap-3 pt-0.5">
                  <a
                    href="https://www.facebook.com/profile.php?id=61579095321240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-heading font-semibold uppercase tracking-wider text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <Facebook size={12} /> Facebook
                  </a>
                  <span className="text-gray-700">•</span>
                  <a
                    href="https://www.instagram.com/solarsmart.energies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-heading font-semibold uppercase tracking-wider text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <Instagram size={12} /> Instagram
                  </a>
                </div>
              </ContactRow>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border border-amber-500/20 text-amber-400/80 bg-amber-500/[0.06]"
                >
                  <ShieldCheck size={12} />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 relative overflow-hidden">
              {/* Top glow */}
              <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, #F59E0B, transparent 70%)',
                }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 12,
                        delay: 0.2,
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="text-green-400" size={32} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white font-heading mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      We'll get back to you within 24 hours with a personalized
                      solar quote.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(initialFormData);
                      }}
                      className="text-amber-400 text-sm hover:text-amber-300 transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                    noValidate
                  >
                    <InputField
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      error={errors.name}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      error={errors.phone}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Monthly Electricity Bill (₹)"
                      name="bill"
                      type="number"
                      placeholder="e.g. 3000"
                      value={formData.bill}
                      error={errors.bill}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="block text-sm text-gray-300 mb-1.5 font-medium">
                        Message{' '}
                        <span className="text-gray-600 font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Any specific requirements?"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full relative group overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          'linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)',
                        backgroundSize: '200% 200%',
                      }}
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2 font-heading">
                        Get Free Quote
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-gray-500 text-xs mb-1">
                        Or call us directly
                      </p>
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <a
                          href="tel:9493936249"
                          className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                        >
                          📞 9493936249
                        </a>
                        <span className="text-gray-700">|</span>
                        <a
                          href="tel:9550130770"
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          📞 9550130770
                        </a>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
           OFFICE VISIT SECTION — Tabbed Interactive Zoom Map Visual Layout
           ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border-t border-white/[0.06] pt-16"
        >
          <style>{`
            @keyframes scanline-sweep {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            @keyframes sonar-pulse {
              0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
              100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
          `}</style>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-10 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* Left Column: Address Details */}
            <div className="space-y-6 relative z-10">
              <span className="font-heading text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase block">
                ✦ Visit Our Office ✦
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                MyHome Solar HQ
              </h3>
              
              <div className="space-y-4">
                <address className="not-italic font-body text-base text-gray-400 leading-relaxed">
                  Ground Floor, Shop 4-9-180/5,<br />
                  Lecturers Colony, beside Union Bank of India,<br />
                  Hayathnagar, Ranga Reddy District,<br />
                  <span className="font-semibold text-white">Hyderabad, Telangana – 501505</span>
                </address>
                
                <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
                  <p className="text-sm text-gray-400 font-body leading-relaxed">
                    <strong className="text-white font-medium">Landmark:</strong> Beside Union Bank of India, Hayathnagar Depot
                  </p>
                  <p className="text-sm text-gray-400 font-body leading-relaxed">
                    <strong className="text-white font-medium">Business Hours:</strong> Monday – Saturday: 10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
              
              {/* Interactive Zoom Level Tabs */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-3 font-heading">
                  Zoom Level / Maps
                </span>
                <div className="flex flex-wrap gap-2">
                  {MAP_LEVELS.map((level, i) => (
                    <button
                      key={level.label}
                      onClick={() => setActiveZoom(i)}
                      onMouseEnter={() => setActiveZoom(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all duration-250 cursor-pointer ${
                        activeZoom === i
                          ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                          : 'bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-amber-500/40'
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
                  className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-gray-950 px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full cursor-pointer font-heading"
                >
                  <Navigation className="w-4 h-4" />
                  Open on Google Maps
                </a>
              </div>
            </div>

            {/* Right Column: Tabbed Interactive Zoom Map Visual Layout */}
            <div
              className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[380px] shadow-lg border border-white/[0.06] bg-black/40 flex flex-col justify-end cursor-pointer group"
              onClick={() => setActiveZoom((prev) => (prev + 1) % MAP_LEVELS.length)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              {/* Ambient vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(3, 7, 18, 0.6) 100%)',
                }}
              />

              {/* Coordinates Target Sonar Lock */}
              <div
                className="absolute z-[7] pointer-events-none transition-all duration-500 ease-out"
                style={{
                  left: MAP_LEVELS[activeZoom].coords.x,
                  top: MAP_LEVELS[activeZoom].coords.y,
                }}
              >
                <span className="absolute w-2.5 h-2.5 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(245,158,11,0.8)] border border-white/40" />
                <span 
                  key={activeZoom}
                  className="absolute w-10 h-10 border border-amber-400/50 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: 'sonar-pulse 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
                  }}
                />
              </div>

              {/* Sweep Scanline */}
              <div 
                key={`scan-${activeZoom}`}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent z-[6] pointer-events-none"
                style={{
                  top: '0%',
                  boxShadow: '0 0 8px rgba(245,158,11,0.4)',
                  animation: 'scanline-sweep 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                }}
              />

              {/* Dynamic Map Transition Container */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZoom}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    animate={{
                      opacity: 1,
                      scale: 1.05,
                      filter: 'blur(0px)',
                      rotateX: -tilt.y * 10,
                      rotateY: tilt.x * 10,
                    }}
                    exit={{ opacity: 0, scale: 1.15, filter: 'blur(6px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <motion.img
                      src={MAP_LEVELS[activeZoom].img}
                      alt={`MyHome Solar - ${MAP_LEVELS[activeZoom].label}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                      animate={{
                        x: tilt.x * -15,
                        y: tilt.y * -15,
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    />
                    {/* Subtle dark gradient overlay at bottom of the map image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic Map Labels Fading Transition */}
              <div className="absolute bottom-14 left-0 right-0 z-[7] text-center px-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`label-${activeZoom}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <span className="font-heading text-lg font-bold text-white tracking-wide drop-shadow block leading-tight">
                      {MAP_LEVELS[activeZoom].label}
                    </span>
                    <span className="mt-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold drop-shadow block">
                      {MAP_LEVELS[activeZoom].sub}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot Pill Navigation Buttons */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-[8] bg-gray-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
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
                          ? 'w-2 h-2 bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.7)]'
                          : i < activeZoom
                          ? 'w-1.5 h-1.5 bg-amber-400/50 group-hover:bg-amber-400/80'
                          : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- helpers ---- */

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center text-amber-400">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5 font-semibold">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1.5 font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 ${
          error
            ? 'border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20'
            : 'border-white/[0.08] focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20'
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
