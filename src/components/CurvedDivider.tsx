import { motion } from 'framer-motion';

interface CurvedDividerProps {
  baseColor?: string;     // Obsidian space black default
  flip?: boolean;         // Flip upside down for different transitions
}

export default function CurvedDivider({
  baseColor = 'var(--solar-bg)',
  flip = false,
}: CurvedDividerProps) {
  return (
    <div 
      className={`relative w-full h-12 md:h-16 pointer-events-none select-none z-10 overflow-visible ${
        flip ? 'rotate-180 -mt-1' : '-mb-1'
      }`}
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="purpleArchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="30%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="70%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* 1. Deep Space Black Base (Background shadow) */}
        <path
          d="M0,75 Q720,25 1440,75 L1440,100 L0,100 Z"
          fill={baseColor}
        />

        {/* 2. Middle Royal Purple Arch with smooth entry animation */}
        <motion.path
          d="M0,50 Q720,5 1440,50 L1440,100 L0,100 Z"
          fill="url(#purpleArchGrad)"
          initial={{ d: "M0,70 Q720,25 1440,70 L1440,100 L0,100 Z" }}
          whileInView={{ d: "M0,50 Q720,5 1440,50 L1440,100 L0,100 Z" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 3. Top Satin Champagne Gold Arch with slight delay for dynamic layering */}
        <motion.path
          d="M0,32 Q720,-15 1440,32 L1440,100 L0,100 Z"
          fill="url(#goldArchGrad)"
          initial={{ d: "M0,60 Q720,20 1440,60 L1440,100 L0,100 Z" }}
          whileInView={{ d: "M0,32 Q720,-15 1440,32 L1440,100 L0,100 Z" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
