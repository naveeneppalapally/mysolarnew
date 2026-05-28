import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How much does a solar system cost for my home in Telangana?',
    answer:
      'A typical 3 kW premium residential system costs around ₹2,20,000 (inclusive of Tier-1 panels, DeccanShield structure, and Growatt/Solis string inverter). After the PM Surya Ghar central government subsidy of ₹78,000, your net out-of-pocket cost is ₹1,42,000.',
  },
  {
    question: 'What is the direct bank transfer (DBT) subsidy structure under the PM Surya Ghar scheme?',
    answer:
      'Under the national PM Surya Ghar Muft Bijli Yojana, residential subsidies are credited directly to your Aadhaar-linked bank account within 30 days of net-meter commissioning. The subsidy is structured as: ₹30,000 flat for a 1 kW system, ₹60,000 flat for a 2 kW system, and capped at ₹78,000 for any system sizes of 3 kW and above.',
  },
  {
    question: 'How does the Telangana "Gruha Jyothi" scheme (free electricity up to 200 units) impact solar returns?',
    answer:
      'The Gruha Jyothi scheme applies exclusively to domestic consumers whose total monthly consumption remains under 200 units AND who hold a valid White Ration Card. If your household consumption exceeds 200 units, you are billed for the entire amount at standard telescopic slab rates (which escalate up to ₹10.00/unit). Solar is highly profitable for households exceeding 200 units as it offsets your highest tariff slabs and brings you back into the zero-bill or lowest-rate bracket.',
  },
  {
    question: 'What is the maximum solar capacity I am allowed to install on my residence in Hyderabad?',
    answer:
      'Under TSERC guidelines, you can install a rooftop system up to 100% of your active sanctioned load (e.g., a 4 kW sanctioned load allows up to a 4 kWp solar system). Low-tension (LT) domestic net metering is capped at 75 kWp; capacities above 75 kWp require a dedicated high-tension (HT) sub-station connection. If a larger system is needed, MyHome Solar will manage the sanctioned load enhancement filings with TGSPDCL/TGNPDCL.',
  },
  {
    question: 'How long does the entire feasibility clearance and net-metering process take?',
    answer:
      'The regulatory timeline typically takes between 25 to 30 days. We manage 100% of the process: days 1–3 for National Portal registration, days 4–12 for TGSPDCL/TGNPDCL Assistant Engineer (AE) physical verification and feasibility clearance, days 13–18 for physical panel installation, days 19–21 for completion report filings, and days 22–30 for safety inspection and net-meter integration.',
  },
  {
    question: 'Does MyHome Solar provide a performance guarantee for daily power generation?',
    answer:
      'Yes. Every system we install is backed by our signature MyHome Solar Shield™ 5-Year Performance Guarantee. We perform a site-specific 3D shadow analysis. If the system underperforms by more than 5% due to installation faults, we reimburse you the cash value of the lost generation at the active TGSPDCL/TGNPDCL tariff rate.',
  },
  {
    question: 'What solar panel and inverter brands do you utilize?',
    answer:
      'We exclusively utilize Tier-1 BIS-certified modules (Premier Energies, Waaree, Adani Solar) featuring Mono-PERC or next-generation TOPCon cells with up to 23.3% efficiency. For inverters, we install CEA-compliant string inverters (Growatt and Solis) or Enphase Energy microinverters for complex, shaded roofs.',
  },
  {
    question: 'Will solar panels damage my roof or cause water leakage during monsoons?',
    answer:
      'No. We do not use mechanical expansion bolts that drill into your waterproofing layer. We utilize Hilti HIT-RE 500 chemical anchoring which forms a molecular concrete bond, followed by constructing raised concrete pedestals sealed with weatherproofing polyurethane sealants. This is backed by our water leakage warranty.',
  },
  {
    question: 'What happens to my solar generation during a power cut or grid outage?',
    answer:
      'Standard grid-tied systems automatically shut down during grid failures as a safety measure called anti-islanding, preventing power from feeding back into the lines and harming DISCOM technicians. For continuous power backup, we can install a Hybrid Solar System equipped with a hybrid inverter and high-cycle lithium-ion batteries.',
  }
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
