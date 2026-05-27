import { Sun, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

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

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const certifications = [
  'TSREDCO Empanelled',
  'MNRE Empanelled Vendor',
  'TSSPDCL & TSNPDCL Approved',
  'PM Surya Ghar Registered',
  'MNRE ID: TSRE260875',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative"
      style={{ background: 'var(--solar-bg-secondary)' }}
    >
      {/* Gold/Purple gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(139,92,246,0.15) 20%, rgba(251,191,36,0.45) 50%, rgba(139,92,246,0.15) 80%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Company */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                <Sun size={16} className="text-solar-bg" />
              </div>
              <span className="text-lg font-bold font-heading tracking-wide">
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  MYHOME
                </span>{' '}
                <span className="text-solar-text">SOLAR</span>
              </span>
            </div>
            <p className="text-solar-text-muted text-sm leading-relaxed mb-4">
              Powering homes and businesses across Telangana with clean, affordable solar
              energy. MNRE Empanelled Vendor (TSRE260875) providing end-to-end solar solutions.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/profile.php?id=61579095321240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-solar-card hover:bg-amber-500/10 border border-solar-border hover:border-amber-500/30 flex items-center justify-center text-solar-text-muted hover:text-solar-gold transition-all duration-300"
                title="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://www.instagram.com/solarsmart.energies/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-solar-card hover:bg-amber-500/10 border border-solar-border hover:border-amber-500/30 flex items-center justify-center text-solar-text-muted hover:text-solar-gold transition-all duration-300"
                title="Instagram"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-solar-text uppercase tracking-wider mb-5 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-solar-text-muted hover:text-solar-gold text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-sm font-semibold text-solar-text uppercase tracking-wider mb-5 font-heading">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <span className="text-solar-text-muted leading-relaxed">
                  Ground floor, Shop No 4-9-180/5, Lectures Colony, Beside Union Bank of India, Hayathnagar, Hyderabad 501505
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <a
                      href="tel:9493936249"
                      className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-sm"
                    >
                      +91 9493936249
                    </a>
                    <span className="text-[7px] font-mono px-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 rounded">Primary & WhatsApp</span>
                  </div>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <a
                  href="mailto:solarsmart.energies@gmail.com"
                  className="text-solar-text-muted hover:text-solar-gold transition-colors break-all"
                >
                  solarsmart.energies@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-solar-text uppercase tracking-wider mb-5 font-heading">
              Certifications
            </h4>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-sm">
                  <ShieldCheck
                    size={14}
                    className="text-amber-500/60 flex-shrink-0"
                  />
                  <span className="text-solar-text-muted">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-solar-border"
        style={{ background: 'rgba(0, 0, 0, 0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Telugu tagline */}
          <p className="text-center text-amber-500/80 text-sm mb-3 font-telugu">
            సోలార్ పెట్టుబడి కాదు... అది పొదుపు, అది భవిష్యత్తు!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-solar-text-dim">
            <p>
              © 2025 MyHome Solar. All rights reserved.
            </p>
            <p className="font-mono">GSTIN: 36AFOFS9652M1ZY</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
