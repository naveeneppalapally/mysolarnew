import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How much does a solar system cost for my home?',
    answer:
      'A typical 3kW residential system costs around ₹1,95,000 before subsidies. After the PM Surya Ghar central government subsidy of ₹78,000, your net cost is only ₹1,17,000.',
  },
  {
    question: 'How much subsidy will I get under PM Surya Ghar?',
    answer:
      'Under PM Surya Ghar Muft Bijli Yojana, you get ₹30,000/kW for the first 2kW and ₹18,000/kW for the 3rd kW. The maximum central subsidy is capped at ₹78,000 for system sizes of 3kW and above.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Typical installation takes 1-2 days. The complete process from site survey to commissioning takes about 7-15 days including paperwork.',
  },
  {
    question: 'What is net metering?',
    answer:
      'Net metering allows you to export excess solar power to the grid and get credit on your electricity bill. We handle the complete DISCOM application and meter installation.',
  },
  {
    question: 'Do solar panels work on cloudy days?',
    answer:
      'Yes! Solar panels generate 25-40% of their rated capacity even on cloudy days. Hyderabad gets 300+ sunny days per year, making it ideal for solar.',
  },
  {
    question: 'What warranty do the panels come with?',
    answer:
      'We provide 25-year performance warranty on panels and 5-year warranty on inverter. Our panels are guaranteed to produce at least 80% power even after 25 years.',
  },
  {
    question: 'Do you handle all the paperwork?',
    answer:
      'Yes! We handle 100% of the paperwork — PM Surya Ghar application, DISCOM net metering application, and all approvals. You just sit back and relax.',
  },
  {
    question: 'What about maintenance?',
    answer:
      'Solar panels require minimal maintenance. We offer annual maintenance packages including panel cleaning, electrical checks, and performance monitoring.',
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'border-amber-500/30 bg-amber-500/[0.04]'
            : 'border-solar-border bg-solar-card hover:border-solar-border-hover'
        }`}
      >
        {/* Gold left accent */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${
            isOpen ? 'bg-gradient-to-b from-amber-400 to-amber-600 opacity-100' : 'opacity-0'
          }`}
        />

        <button
          onClick={onToggle}
          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group cursor-pointer"
          aria-expanded={isOpen}
        >
          <span
            className={`text-[15px] md:text-base font-medium transition-colors duration-200 ${
              isOpen ? 'text-amber-400' : 'text-solar-text group-hover:text-solar-gold'
            }`}
          >
            {item.question}
          </span>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-200 ${
              isOpen
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-solar-border bg-solar-card text-solar-text-muted group-hover:text-solar-text group-hover:border-solar-border-hover'
            }`}
          >
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 text-solar-text-muted text-sm leading-relaxed border-t border-solar-border pt-4">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--solar-bg)' }}
    >
      {/* Background radial */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--solar-purple), transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label mb-6">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-solar-text mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
