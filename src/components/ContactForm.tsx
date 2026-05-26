import { useRef, useState } from 'react';
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
} from 'lucide-react';

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
  'TGREDCO Authorized',
  'MNRE Empanelled',
  'Tata Power SolaRoof Partner',
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

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
              <p className="text-gray-500 text-sm">(Solarsmart Energies)</p>
            </div>

            <div className="space-y-5">
              <ContactRow icon={<MapPin size={18} />} label="Address">
                <span className="text-gray-300 text-sm leading-relaxed">
                  Shop 4-9-180/5, Beside Union Bank of India, Lecturers Colony,
                  Hayathnagar, Hyderabad, Telangana 501505
                </span>
              </ContactRow>

              <ContactRow icon={<Phone size={18} />} label="Phone">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href="tel:9951637624"
                    className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
                  >
                    9951637624
                  </a>
                  <a
                    href="tel:9603449393"
                    className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
                  >
                    9603449393
                  </a>
                  <a
                    href="tel:9550130770"
                    className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
                  >
                    9550130770{' '}
                    <span className="text-gray-500 text-xs">(Mr. Gopi)</span>
                  </a>
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

              <ContactRow icon={<FileText size={18} />} label="GSTIN">
                <span className="text-gray-300 text-sm font-mono">
                  36AFOFS9652M1ZY
                </span>
              </ContactRow>

              <ContactRow icon={<Clock size={18} />} label="Hours">
                <span className="text-gray-300 text-sm">
                  Mon–Sat &nbsp;9:00 AM – 7:00 PM
                </span>
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
                          href="tel:9550130770"
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          📞 9550130770
                        </a>
                        <span className="text-gray-700">|</span>
                        <a
                          href="tel:9951637624"
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          📞 9951637624
                        </a>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
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
