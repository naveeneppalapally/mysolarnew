const MARQUEE_TEXT =
  '☀ TSSPDCL & TSNPDCL APPROVED  •  PM SURYA GHAR REGISTERED  •  MNRE EMPANELLED — TSRE260875  •  TSREDCO EMPANELLED  •  FREE SITE VISIT  •  BANK LOAN / EMI AVAILABLE  •  100% SUBSIDY PAPERWORK HANDLED  •  TATA POWER · ADANI · WAAREE PANELS';

const Marquee = () => {
  return (
    <div
      className="relative z-20 w-full overflow-hidden py-3"
      style={{
        background: 'linear-gradient(90deg, #F5A623, #FFD700, #F5A623)',
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
