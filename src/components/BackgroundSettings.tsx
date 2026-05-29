import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Sparkles, Sun, Zap, Wind, Activity, Layers, Cpu, Compass, Flame, Binary, Gem, Type, Palette, Square } from 'lucide-react';
import { useBackgroundSettings } from '../context/BackgroundSettingsContext';
import type { BackgroundStyle } from '../context/BackgroundSettingsContext';
import { useSolarTime } from '../context/SolarTimeContext';
import { useTheme } from '../context/ThemeContext';

export default function BackgroundSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const { 
    backgroundStyle, 
    setBackgroundStyle, 
    particleCount, 
    setParticleCount, 
    speedMultiplier, 
    setSpeedMultiplier,
    fontTheme,
    setFontTheme,
    cardColorMode,
    setCardColorMode,
    whiteBackground,
    toggleWhiteBackground
  } = useBackgroundSettings();

  const { timeOfDay, setTimeOfDay, currentPhase } = useSolarTime();

  // Inject chosen background style as a global class on the root html element
  useEffect(() => {
    const root = document.documentElement;
    const classesToRemove = [
      'style-none',
      'style-silicon-grid',
      'style-gradient-embers',
      'style-energy-waves',
      'style-cosmic-wind',
      'style-solar-aurora',
      'style-magnetic-resonance',
      'style-hex-cells',
      'style-liquid-lava',
      'style-digital-rain',
      'style-prismatic-shards'
    ];
    classesToRemove.forEach((cls) => root.classList.remove(cls));
    root.classList.add(`style-${backgroundStyle}`);
  }, [backgroundStyle]);

  // Inject active font theme onto root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-theme-poppins', 'font-theme-syne');
    root.classList.add(`font-theme-${fontTheme}`);
  }, [fontTheme]);

  // Inject card color mode — 'card-unified' overrides all accent CSS vars to gold
  useEffect(() => {
    const root = document.documentElement;
    if (cardColorMode === 'unified') {
      root.classList.add('card-unified');
    } else {
      root.classList.remove('card-unified');
    }
  }, [cardColorMode]);

  const handleTimeChange = (phase: 'dawn' | 'noon' | 'dusk' | 'night') => {
    switch (phase) {
      case 'dawn': setTimeOfDay(7.5); break;
      case 'noon': setTimeOfDay(12); break;
      case 'dusk': setTimeOfDay(18.5); break;
      case 'night': setTimeOfDay(22); break;
    }
  };

  const backgroundStylesList: { 
    id: BackgroundStyle; 
    name: string; 
    desc: string; 
    icon: React.ComponentType<{ className?: string; size?: number }>; 
  }[] = [
    { 
      id: 'none', 
      name: 'Static / Off', 
      desc: 'No moving particles or grid animations. Pure luxury gradient canvas background only.',
      icon: X
    },
    { 
      id: 'silicon-grid', 
      name: 'Silicon Cyber Grid', 
      desc: 'High-contrast cyberpunk motherboard pulsing with energetic neon cyan data currents.',
      icon: Zap
    },
    { 
      id: 'gradient-embers', 
      name: 'Drifting Solar Embers', 
      desc: 'Warm gold and solar amber sparks drifting gently over a dual-gradient atmospheric wash.',
      icon: Sun
    },
    { 
      id: 'energy-waves', 
      name: 'Solar Wave Currents', 
      desc: 'Overlapping, high-fidelity ribbon waves representing flowing solar photon current.',
      icon: Activity
    },
    { 
      id: 'cosmic-wind', 
      name: 'Cosmic Nebula Wind', 
      desc: 'Drifting through a dreamy deep-space violet nebula filled with shimmering silver stellar dust.',
      icon: Wind
    },
    {
      id: 'solar-aurora',
      name: 'Solar Aurora Curtains',
      desc: 'Sweeping, massive geomagnetic curtains of jade green and magenta light waves.',
      icon: Layers
    },
    { 
      id: 'magnetic-resonance', 
      name: 'Magnetic Flux Loops', 
      desc: 'Rotating concentric magnetic resonance ellipses surrounding the active solar core.',
      icon: Compass
    },
    { 
      id: 'hex-cells', 
      name: 'Glowing Honeycomb Cells', 
      desc: 'A sleek, high-tech grid of glowing biophilic digital hexagons breathing in and out.',
      icon: Cpu
    },
    { 
      id: 'liquid-lava', 
      name: 'Solar Flare Plasma', 
      desc: 'A heavy, molten crimson and sunset orange lava field that reacts dynamically to your touch.',
      icon: Flame
    },
    { 
      id: 'digital-rain', 
      name: 'Retro Telemetry Matrix', 
      desc: 'A retro-futuristic console screen raining green columns of active solar core data.',
      icon: Binary
    },
    { 
      id: 'prismatic-shards', 
      name: 'Prismatic Light Shards', 
      desc: 'Rotating premium luxury crystal glass prisms reflecting soft rainbow lens flares.',
      icon: Gem
    }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-[95]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center border border-amber-500/30 bg-solar-card-solid backdrop-blur-md text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 shadow-lg shadow-black/40 cursor-pointer relative group"
          aria-label="Customize background atmosphere"
        >
          {/* Subtle glow ring */}
          <span className="absolute -inset-1 rounded-full bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          
          <Settings size={24} className={isOpen ? 'text-amber-400' : 'text-amber-400 group-hover:text-amber-300'} />
        </motion.button>
      </div>

      {/* Settings HUD Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-6 z-[95] w-[340px] sm:w-[380px] max-h-[75vh] overflow-y-auto rounded-2xl bg-solar-card-solid border border-solar-border shadow-2xl p-5 backdrop-blur-xl flex flex-col gap-4 text-solar-text custom-scrollbar"
            data-lenis-prevent
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              overscrollBehavior: 'contain'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-solar-border">
              <div className="flex flex-col">
                <h3 className="text-base font-bold font-heading text-solar-text flex items-center gap-1.5 mt-0.5">
                  <Sparkles size={15} className="text-amber-400" />
                  Atmosphere
                </h3>
                <span className="text-[10px] text-solar-text-dim font-medium tracking-wide uppercase mt-0.5">Circadian Core</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-solar-text-muted hover:text-solar-text hover:bg-solar-border/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── White Background Toggle — only shown in Light Mode ── */}
            {isLightMode && (
            <div className="flex flex-col gap-2 pb-3 border-b border-solar-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Square size={11} className="text-amber-400" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Background Color
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* White */}
                <button
                  type="button"
                  onClick={() => !whiteBackground && toggleWhiteBackground()}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    whiteBackground
                      ? 'bg-amber-500/10 border-amber-500/80 text-amber-400'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white shadow-sm" />
                  <span>White</span>
                </button>

                {/* Themed (warm light palette) */}
                <button
                  type="button"
                  onClick={() => whiteBackground && toggleWhiteBackground()}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    !whiteBackground
                      ? 'bg-amber-500/10 border-amber-500/80 text-amber-400'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  <div className="flex gap-0.5">
                    <div className="w-2.5 h-5 rounded-sm" style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f5f0e8 100%)' }} />
                    <div className="w-2.5 h-5 rounded-sm" style={{ background: 'linear-gradient(180deg, #fbbf24 0%, #f97316 100%)' }} />
                  </div>
                  <span>Themed</span>
                </button>
              </div>
              <div className="text-[9px] text-gray-500 leading-tight">
                White: clean minimal look. Themed: warm solar light palette.
              </div>
            </div>
            )}

            {/* ── Card Color Style Toggle ── */}
            <div className="flex flex-col gap-2 pb-3 border-b border-solar-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Palette size={11} className="text-amber-400" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Card Color Style
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* Unified Gold — the corrected option */}
                <button
                  type="button"
                  onClick={() => setCardColorMode('unified')}
                  onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                    if (touch && Math.abs(touch.clientY - startY) < 10) setCardColorMode('unified');
                  }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    cardColorMode === 'unified'
                      ? 'bg-amber-500/10 border-amber-500/80 text-amber-400'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  {/* Mini preview: all gold */}
                  <div className="flex gap-0.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F59E0B' }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F59E0B' }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F59E0B' }} />
                  </div>
                  <span>Unified Gold</span>
                </button>

                {/* Trifold option */}
                <button
                  type="button"
                  onClick={() => setCardColorMode('trifold')}
                  onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                    if (touch && Math.abs(touch.clientY - startY) < 10) setCardColorMode('trifold');
                  }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    cardColorMode === 'trifold'
                      ? 'bg-sky-500/10 border-sky-400/60 text-sky-400'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  {/* Mini preview: amber + blue + green */}
                  <div className="flex gap-0.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F59E0B' }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#0EA5E9' }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#10B981' }} />
                  </div>
                  <span>Trifold Colors</span>
                </button>
              </div>
              <div className="text-[9px] text-gray-500 leading-tight">
                Compare unified brand gold vs the original amber/blue/green card scheme.
              </div>
            </div>

            {/* Section 4: Headline Typography */}
            <div className="flex flex-col gap-2 pb-3 border-b border-solar-border">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
                Headline Typography
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    console.log("HUD Click: Changing font theme to Poppins");
                    setFontTheme('poppins');
                  }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) {
                      e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                    }
                  }}
                  onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                    if (touch && Math.abs(touch.clientY - startY) < 10) {
                      console.log("HUD Touch: Changing font theme to Poppins");
                      setFontTheme('poppins');
                    }
                  }}
                  className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    fontTheme === 'poppins'
                      ? 'bg-amber-500/10 border-amber-500/80 text-amber-400 font-bold shadow-md shadow-amber-500/5'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  <Type size={12} />
                  Modern Sans
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log("HUD Click: Changing font theme to Syne");
                    setFontTheme('syne');
                  }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) {
                      e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                    }
                  }}
                  onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                    if (touch && Math.abs(touch.clientY - startY) < 10) {
                      console.log("HUD Touch: Changing font theme to Syne");
                      setFontTheme('syne');
                    }
                  }}
                  className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    fontTheme === 'syne'
                      ? 'bg-amber-500/10 border-amber-500/80 text-amber-400 font-bold shadow-md shadow-amber-500/5'
                      : 'bg-solar-card border-solar-border text-gray-400 hover:text-solar-text hover:border-solar-border-hover'
                  }`}
                >
                  <Type size={12} className="rotate-12" />
                  Futuristic Tech
                </button>
              </div>
              <div className="text-[9px] text-gray-500 leading-tight">
                Switch between clean geometric Poppins and progressive techno-wide Syne.
              </div>
            </div>

            {/* Section 1: Active Interactive Background Style */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
                Background Algorithm
              </span>
              <div 
                className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar"
                data-lenis-prevent
                style={{ overscrollBehavior: 'contain' }}
              >
                {backgroundStylesList.map((style) => {
                  const Icon = style.icon;
                  const isActive = backgroundStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        console.log("HUD Click: Switching background style to:", style.id);
                        setBackgroundStyle(style.id);
                        if (style.id === 'none') {
                          setSpeedMultiplier(0.0);
                        } else if (speedMultiplier === 0) {
                          setSpeedMultiplier(1.0);
                        }
                      }}
                      onTouchStart={(e) => {
                        const touch = e.touches[0];
                        if (touch) {
                          e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                        }
                      }}
                      onTouchEnd={(e) => {
                        const touch = e.changedTouches[0];
                        const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                        if (touch && Math.abs(touch.clientY - startY) < 10) {
                          console.log("HUD Touch: Switching background style to:", style.id);
                          setBackgroundStyle(style.id);
                          if (style.id === 'none') {
                            setSpeedMultiplier(0.0);
                          } else if (speedMultiplier === 0) {
                            setSpeedMultiplier(1.0);
                          }
                        }
                      }}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/80 shadow-md shadow-amber-500/5'
                          : 'bg-solar-card border border-solar-border hover:border-solar-border-hover hover:bg-solar-bg-tertiary'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-amber-500 text-gray-950' : 'bg-solar-bg-tertiary text-solar-text-muted'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-xs font-semibold ${isActive ? 'text-amber-400 font-bold' : 'text-solar-text'}`}>
                          {style.name}
                        </span>
                        <span className="text-[10px] text-gray-400 leading-relaxed">
                          {style.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Parameters Sliders */}
            {backgroundStyle !== 'energy-waves' && (
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  <span>Ember / Particle Density</span>
                  <span className="font-mono text-amber-400">{particleCount} units</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="150"
                    value={particleCount}
                    onChange={(e) => setParticleCount(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded bg-gray-800 accent-amber-500 outline-none appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                <span>Animation Velocity</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400">
                    {speedMultiplier === 0 ? 'Off / Static' : `${speedMultiplier.toFixed(1)}x`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSpeedMultiplier(speedMultiplier > 0 ? 0.0 : 1.0)}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                      speedMultiplier > 0 
                        ? 'bg-amber-500/20 border border-amber-500/80 text-amber-400' 
                        : 'bg-solar-card border border-solar-border text-gray-400'
                    }`}
                  >
                    {speedMultiplier > 0 ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.0"
                  max="2.5"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded bg-gray-800 accent-amber-500 outline-none appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Section 3: Solar Theme Overrides */}
            <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
                Solar Time Theme
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['dawn', 'noon', 'dusk', 'night'] as const).map((phase) => {
                  const isActive = currentPhase === phase;
                  const getBadgeColor = () => {
                    if (phase === 'dawn') return isActive ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'hover:border-orange-500/30 text-gray-400 hover:text-orange-400';
                    if (phase === 'noon') return isActive ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'hover:border-yellow-500/30 text-gray-400 hover:text-yellow-400';
                    if (phase === 'dusk') return isActive ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'hover:border-rose-500/30 text-gray-400 hover:text-rose-400';
                    return isActive ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'hover:border-blue-500/30 text-gray-400 hover:text-blue-400';
                  };

                  return (
                    <button
                      key={phase}
                      onClick={() => {
                        console.log("HUD Click: Changing time phase to:", phase);
                        handleTimeChange(phase);
                      }}
                      onTouchStart={(e) => {
                        const touch = e.touches[0];
                        if (touch) {
                          e.currentTarget.setAttribute('data-touch-y', touch.clientY.toString());
                        }
                      }}
                      onTouchEnd={(e) => {
                        const touch = e.changedTouches[0];
                        const startY = parseFloat(e.currentTarget.getAttribute('data-touch-y') || '0');
                        if (touch && Math.abs(touch.clientY - startY) < 10) {
                          console.log("HUD Touch: Changing time phase to:", phase);
                          handleTimeChange(phase);
                        }
                      }}
                      className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold text-center capitalize transition-all duration-200 cursor-pointer ${getBadgeColor()}`}
                    >
                      {phase}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[9px] text-gray-500 mt-1">
                <span>Synchronized with Navbar Solar Arc slider</span>
                <span className="font-mono text-gray-400">{Math.floor(timeOfDay)}h</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
