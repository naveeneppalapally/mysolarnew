import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp, sectionViewport } from '../lib/animations';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How much does a 3 kW solar system cost in Hyderabad?',
    answer:
      'A 3 kW system costs approx. ₹1.5–2.0 lakh before subsidy. After central subsidy (₹78,000) under the PM Surya Ghar scheme, you pay approximately ₹72,000–₹1.22 lakh. We provide free site visits and quotes.',
  },
  {
    question: 'How much roof space do I need?',
    answer:
      '100 sq ft of shadow-free roof per 1 kW. So a 3 kW system needs ~300 sq ft. Our team does a free site survey to assess your rooftop.',
  },
  {
    question: 'Will my solar work during power cuts?',
    answer:
      'On-grid systems shut off during grid outages (safety requirement). For backup during cuts, we recommend a hybrid system with battery storage.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Site visit: 1 day. Approval: 3–7 days. Installation: 1–3 days. Net meter connection: 7–15 days (handled by us with DISCOM). Total: about 2–4 weeks.',
  },
  {
    question: 'Is MyHome Solar TGREDCO authorized?',
    answer:
      'Yes! We are an authorized TGREDCO vendor and MNRE-empaneled installer. This is mandatory to claim government subsidies. Your subsidy is guaranteed with us.',
  },
  {
    question: 'What warranty do I get?',
    answer:
      'Solar panels: 25-year performance warranty. Inverter: 5–10 year warranty. Structure: 10-year warranty. We also offer Annual Maintenance Contracts (AMC).',
  },
  {
    question: 'What is the PM Surya Ghar Yojana?',
    answer:
      'A central government scheme providing subsidy up to ₹78,000 for residential rooftop solar. Goal: 1 crore homes by 2027. Subsidy transferred directly to your bank within 30 days.',
  },
  {
    question: 'Do you serve agricultural/farm customers?',
    answer:
      'Yes! Under PM-KUSUM scheme, farmers get 60% low-cost EMI loans. We install solar pumps, solar fencing, and farm solar plants.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative section-alt overflow-hidden">
      <motion.div
        className="section-wrapper"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        {/* ── Heading ── */}
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-10">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading mx-auto">
            Everything you need to know about going solar in Hyderabad.
          </p>
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-xl mb-4 transition-all duration-300 ${
                  isOpen
                    ? 'border-l-4 border-l-solar-gold'
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-lg text-solar-text pr-4 group-hover:text-solar-gold transition-colors duration-300">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isOpen ? 'text-solar-gold' : 'text-solar-text-muted'
                      }`}
                    />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-solar-text-muted leading-relaxed font-body">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;
