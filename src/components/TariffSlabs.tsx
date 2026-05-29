import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink, Zap, Info } from 'lucide-react';

/* ─── Tariff data ─── */
const SLABS = [
  {
    category: 'LT-I(A)',
    label: 'Low Consumption',
    subtitle: 'Up to 100 units / month',
    color: 'emerald' as const,
    rows: [
      { range: '0 – 50 units', rate: '₹1.95', highlight: false },
      { range: '51 – 100 units', rate: '₹3.10', highlight: false },
    ],
  },
  {
    category: 'LT-I(B)(i)',
    label: 'Mid Consumption',
    subtitle: '101 – 200 units / month',
    color: 'amber' as const,
    rows: [
      { range: '0 – 100 units', rate: '₹3.40', highlight: false },
      { range: '101 – 200 units', rate: '₹4.80', highlight: true },
    ],
  },
  {
    category: 'LT-I(B)(ii)',
    label: 'High Consumption',
    subtitle: 'Above 200 units / month',
    color: 'red' as const,
    rows: [
      { range: '0 – 200 units', rate: '₹5.10', highlight: false },
      { range: '201 – 300 units', rate: '₹7.70', highlight: false },
      { range: '301 – 400 units', rate: '₹9.00', highlight: false },
      { range: '401 – 800 units', rate: '₹9.50', highlight: false },
      { range: 'Above 800 units', rate: '₹10.00', highlight: true },
    ],
  },
];

const ADDITIONAL_CHARGES = [
  {
    name: 'Electricity Duty',
    value: '6%',
    desc: 'Levied by Telangana State on total energy charges',
  },
  {
    name: 'Fixed Charges',
    value: '₹10/kW',
    desc: 'Monthly charge based on sanctioned load (₹50/kW for >800 units)',
  },
  {
    name: 'Fuel Surcharge (FSA)',
    value: 'Variable',
    desc: 'Periodic adjustment for fuel price fluctuations — applied as notified by TGERC',
  },
  {
    name: 'Gruha Jyothi Scheme',
    value: '0 bill',
    desc: 'Eligible consumers may get zero bill for up to 200 units/month under this govt scheme',
  },
];

const colorMap = {
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    border: 'border-emerald-500/20',
    headerBg: 'bg-emerald-500/5',
    dot: 'bg-emerald-400',
    highlightRow: 'bg-emerald-500/10 text-emerald-300',
    rateNormal: 'text-emerald-400',
  },
  amber: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    border: 'border-amber-500/20',
    headerBg: 'bg-amber-500/5',
    dot: 'bg-amber-400',
    highlightRow: 'bg-amber-500/10 text-amber-300',
    rateNormal: 'text-amber-400',
  },
  red: {
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    border: 'border-red-500/20',
    headerBg: 'bg-red-500/5',
    dot: 'bg-red-400',
    highlightRow: 'bg-red-500/10 text-red-300',
    rateNormal: 'text-red-400',
  },
};

export default function TariffSlabs() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/[0.025] blur-[120px] pointer-events-none" />

      <div className="section-wrapper">

        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label inline-flex items-center gap-2" style={{ color: '#F59E0B' }}>
            <Zap className="w-3.5 h-3.5" />
            TELANGANA ELECTRICITY TARIFF
          </span>
          <h2 className="section-heading mt-2">
            TGSPDCL &amp; TGNPDCL Domestic Tariff Slabs
          </h2>
          <p className="mt-3 text-sm text-solar-text-muted font-body max-w-2xl mx-auto leading-relaxed">
            Telangana uses a <strong className="text-solar-text">telescopic slab-based billing system</strong> — 
            the more you consume, the higher the rate applied to each slab. 
            Solar significantly reduces or eliminates your bill by offsetting grid consumption.
          </p>
        </motion.div>

        {/* ─── Tariff Tables Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {SLABS.map((slab, si) => {
            const c = colorMap[slab.color];
            return (
              <motion.div
                key={slab.category}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: si * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border ${c.border} bg-solar-card backdrop-blur-xl overflow-hidden`}
              >
                {/* Card Header */}
                <div className={`${c.headerBg} px-5 py-4 border-b ${c.border}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className={`text-[10px] font-bold tracking-[0.25em] uppercase border px-2 py-0.5 rounded-full ${c.badge}`}>
                      {slab.category}
                    </span>
                  </div>
                  <p className="text-solar-text font-heading font-semibold text-base mt-1">{slab.label}</p>
                  <p className="text-solar-text-muted text-xs font-body mt-0.5">{slab.subtitle}</p>
                </div>

                {/* Rates Table */}
                <div className="p-1">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-solar-text-dim">
                        <th className="text-left px-4 py-2 font-medium">Units/Month</th>
                        <th className="text-right px-4 py-2 font-medium">Rate (₹/Unit)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slab.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={`transition-colors ${
                            row.highlight
                              ? c.highlightRow
                              : 'text-solar-text-muted hover:bg-white/[0.02]'
                          }`}
                        >
                          <td className="px-4 py-2.5 font-medium">{row.range}</td>
                          <td className={`px-4 py-2.5 text-right font-bold tabular-nums ${row.highlight ? '' : c.rateNormal}`}>
                            {row.rate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Additional Charges ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-solar-border bg-solar-card backdrop-blur-xl overflow-hidden mb-6"
        >
          <div className="px-5 py-4 border-b border-solar-border flex items-center gap-2">
            <Info className="w-4 h-4 text-solar-text-muted" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-solar-text-muted font-body">
              Additional Bill Components
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-solar-border">
            {ADDITIONAL_CHARGES.map((charge) => (
              <div key={charge.name} className="px-5 py-4">
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-xs text-solar-text-muted font-body font-medium">{charge.name}</span>
                  <span className="text-sm font-bold text-amber-400 font-heading tabular-nums shrink-0">{charge.value}</span>
                </div>
                <p className="text-[11px] text-solar-text-dim font-body leading-relaxed">{charge.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Disclaimer / Warning Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] backdrop-blur-xl px-5 py-5"
          role="note"
          aria-label="Tariff accuracy disclaimer"
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-300 font-semibold text-sm font-heading mb-1 tracking-wide">
                ⚠️ For Reference Only — Not a Substitute for Your Official Bill
              </p>
              <p className="text-solar-text-muted text-sm font-body leading-relaxed">
                The tariff rates shown above are based on publicly available data published by the{' '}
                <strong className="text-solar-text">Telangana State Electricity Regulatory Commission (TGERC)</strong>, 
                effective from November 2024. These figures are provided for general awareness and educational purposes only. 
                Actual charges on your bill may differ due to periodic revisions, Fuel Surcharge Adjustments (FSA), 
                the Gruha Jyothi scheme, your specific sanctioned load, meter rent, and other regulatory changes.
              </p>
              <p className="text-solar-text-dim text-xs font-body mt-2 leading-relaxed">
                Always refer to your latest electricity bill or the official websites for the most accurate rates applicable to your connection:
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <a
                  href="https://www.tgsouthernpower.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/30 rounded-full px-3 py-1.5 hover:bg-amber-500/10"
                >
                  TGSPDCL Official Website
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.tgnpdcl.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/30 rounded-full px-3 py-1.5 hover:bg-amber-500/10"
                >
                  TGNPDCL Official Website
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://tgerc.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/30 rounded-full px-3 py-1.5 hover:bg-amber-500/10"
                >
                  TGERC Official Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
