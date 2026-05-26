import { motion } from 'framer-motion';
import { Check, Phone, Mail, MapPin } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { staggerContainer, fadeInUp, sectionViewport } from '../lib/animations';

const quickLinks = [
  { label: 'Home', section: 'home' },
  { label: 'Services', section: 'services' },
  { label: 'Why Solar', section: 'why-solar' },
  { label: 'Subsidy Calculator', section: 'subsidy' },
  { label: 'Our Process', section: 'process' },
  { label: 'Contact', section: 'contact' },
];

const authorizations = [
  'TSSPDCL Approved (South Telangana)',
  'TSNPDCL Approved (North Telangana)',
  'TSREDCO Empanelled',
  'MNRE Empanelled — TSRE260875',
  'PM Surya Ghar Registered',
];

const Footer = () => {
  return (
    <footer className="bg-solar-bg border-t border-solar-border">
      <motion.div
        className="section-wrapper"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* ── Column 1: Logo + Tagline ── */}
          <motion.div variants={fadeInUp}>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-solar-border bg-transparent flex-shrink-0">
                <img src="/logo.png" alt="MyHome Solar" className="w-full h-full object-contain transition-transform" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-solar-text block leading-tight">
                  MyHome <span className="text-solar-gold">Solar</span>
                </span>
                <span className="text-xs text-solar-text-muted font-body">Solarsmart Energies</span>
              </div>
            </div>

            {/* Tagline English */}
            <p className="text-solar-text-muted text-sm leading-relaxed mb-2">
              Solar isn't an expense… it's savings, it's the future!
            </p>
            {/* Tagline Telugu */}
            <p className="text-solar-gold text-sm font-semibold leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
              సౌరశక్తితో స్వయం సమృద్ధి
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a href="tel:+919493936249" className="flex items-center gap-2 text-solar-text-muted text-sm hover:text-solar-gold transition-colors">
                <Phone className="w-4 h-4 text-solar-gold flex-shrink-0" />
                +91 94939 36249
              </a>
              <a href="mailto:solarsmart.energies@gmail.com" className="flex items-center gap-2 text-solar-text-muted text-sm hover:text-solar-gold transition-colors">
                <Mail className="w-4 h-4 text-solar-gold flex-shrink-0" />
                solarsmart.energies@gmail.com
              </a>
              <div className="flex items-start gap-2 text-solar-text-muted text-sm">
                <MapPin className="w-4 h-4 text-solar-gold flex-shrink-0 mt-0.5" />
                <span>Shop 4-9-180/5, Lecturers Colony, Hayathnagar, Hyderabad 501505</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579095321240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-solar-gold/10 border border-solar-gold/20 flex items-center justify-center hover:bg-solar-gold/20 transition-colors duration-200"
                aria-label="Facebook"
              >
                {/* Facebook SVG */}
                <svg className="w-4 h-4" fill="var(--solar-emerald)" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/solarsmart.energies/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-solar-gold/10 border border-solar-gold/20 flex items-center justify-center hover:bg-solar-gold/20 transition-colors duration-200"
                aria-label="Instagram"
              >
                {/* Instagram SVG */}
                <svg className="w-4 h-4" fill="var(--solar-emerald)" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* ── Column 2: Quick Links ── */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-heading font-semibold text-solar-text mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="nav-link text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 3: Authorizations ── */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-heading font-semibold text-solar-text mb-4">Certifications</h3>
            <ul className="space-y-3 mb-5">
              {authorizations.map((auth) => (
                <li key={auth} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-solar-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-solar-text-muted text-sm">{auth}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-solar-border/40">
              <p className="text-solar-text-muted text-xs">
                GSTIN:{' '}
                <span className="font-mono text-solar-text">36AFOFS9652M1ZY</span>
              </p>
              <p className="text-solar-text-muted text-xs mt-1">
                Serving: Hyderabad · Mancherial · Rangareddy · Medchal
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-solar-border mt-8 pt-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-solar-text-muted text-xs">
            <p>© 2025 MyHome Solar (Solarsmart Energies). All rights reserved.</p>
            <p>Made with ☀️ for a brighter Hyderabad</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
