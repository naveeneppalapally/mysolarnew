const MARQUEE_TEXT =
  '✦ PM SURYA GHAR SUBSIDY APPROVED ✦ 90% BILL REDUCTION ✦ 25-YEAR PANEL WARRANTY ✦ TSSPDCL & TSNPDCL APPROVED  •  MNRE EMPANELLED — TSRE260875  •  TSREDCO EMPANELLED  •  FREE SITE VISIT  •  BANK LOAN / EMI AVAILABLE  •  100% SUBSIDY PAPERWORK HANDLED  •  TATA POWER · ADANI · WAAREE PANELS';

const Marquee = () => {
  return (
    <div
      className="relative z-20 w-full overflow-hidden py-3"
      style={{
        background: 'linear-gradient(90deg, var(--solar-emerald), var(--solar-gold), var(--solar-emerald))',
      }}
      aria-label="Scrolling announcements"
      role="marquee"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate content twice for seamless infinite loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="mx-8 font-heading font-semibold text-sm uppercase tracking-widest text-white"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
        {[2, 3].map((i) => (
          <span
            key={i}
            className="mx-8 font-heading font-semibold text-sm uppercase tracking-widest text-white"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
