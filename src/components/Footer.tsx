import { Sun, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const certifications = [
  'TGREDCO Authorized',
  'MNRE Empanelled',
  'Tata Power SolaRoof Partner',
  'PM Surya Ghar Registered',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative"
      style={{ background: '#020409' }}
    >
      {/* Gold gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, #F59E0B44, #FBBF2488, #F59E0B44, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Company */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center">
                <Sun size={16} className="text-gray-900" />
              </div>
              <span className="text-lg font-bold font-heading tracking-wide">
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  MYHOME
                </span>{' '}
                <span className="text-white">SOLAR</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Powering homes across Hyderabad with clean, affordable solar
              energy. Your trusted partner for rooftop solar installations and
              government subsidy assistance.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 font-heading">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <span className="text-gray-400 leading-relaxed">
                  Shop 4-9-180/5, Beside Union Bank, Lecturers Colony,
                  Hayathnagar, Hyderabad 501505
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:9951637624"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    9951637624
                  </a>
                  <a
                    href="tel:9603449393"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    9603449393
                  </a>
                  <a
                    href="tel:9550130770"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    9550130770
                  </a>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail
                  size={16}
                  className="text-amber-500/60 flex-shrink-0 mt-0.5"
                />
                <a
                  href="mailto:solarsmart.energies@gmail.com"
                  className="text-gray-400 hover:text-amber-400 transition-colors break-all"
                >
                  solarsmart.energies@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 font-heading">
              Certifications
            </h4>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-sm">
                  <ShieldCheck
                    size={14}
                    className="text-amber-500/60 flex-shrink-0"
                  />
                  <span className="text-gray-400">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-white/[0.04]"
        style={{ background: '#01020566' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Telugu tagline */}
          <p className="text-center text-amber-400/60 text-sm mb-3 font-telugu">
            సోలార్ పెట్టుబడి కాదు... అది పొదుపు, అది భవిష్యత్తు!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>
              © 2025 MyHome Solar (Solarsmart Energies). All rights reserved.
            </p>
            <p className="font-mono">GSTIN: 36AFOFS9652M1ZY</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
