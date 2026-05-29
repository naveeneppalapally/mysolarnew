/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

export type BackgroundStyle = 
  | 'none'
  | 'silicon-grid' 
  | 'gradient-embers'
  | 'energy-waves'
  | 'cosmic-wind'
  | 'solar-aurora'
  | 'magnetic-resonance'
  | 'hex-cells'
  | 'liquid-lava'
  | 'digital-rain'
  | 'prismatic-shards';

export type FontTheme = 'poppins' | 'syne';
export type CardColorMode = 'unified' | 'trifold' | 'brochure' | 'brochure-panels';

interface BackgroundSettingsContextType {
  backgroundStyle: BackgroundStyle;
  setBackgroundStyle: (style: BackgroundStyle) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
  speedMultiplier: number;
  setSpeedMultiplier: (multiplier: number) => void;
  fontTheme: FontTheme;
  setFontTheme: (theme: FontTheme) => void;
  cardColorMode: CardColorMode;
  setCardColorMode: (mode: CardColorMode) => void;
  whiteBackground: boolean;
  toggleWhiteBackground: () => void;
}

const BackgroundSettingsContext = createContext<BackgroundSettingsContextType | undefined>(undefined);

export const BackgroundSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>(() => {
    const saved = localStorage.getItem('solar_background_style') as BackgroundStyle;
    const removedStyles = [
      'classic-network', 
      'star-burst'
    ];
    if (removedStyles.includes(saved as string)) {
      return 'magnetic-resonance';
    }
    return saved || 'magnetic-resonance';
  });

  const [particleCount, setParticleCount] = useState<number>(() => {
    const saved = localStorage.getItem('solar_particle_count');
    return saved ? parseInt(saved, 10) : 50;
  });

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(() => {
    const saved = localStorage.getItem('solar_speed_multiplier');
    return saved ? parseFloat(saved) : 1.0;
  });

  const [fontTheme, setFontTheme] = useState<FontTheme>(() => {
    const saved = localStorage.getItem('solar_font_theme') as FontTheme;
    return saved || 'poppins';
  });

  const [cardColorMode, setCardColorMode] = useState<CardColorMode>(() => {
    const saved = localStorage.getItem('solar_card_color_mode') as CardColorMode;
    return saved || 'unified';
  });

  const [whiteBackground, setWhiteBackground] = useState<boolean>(() => {
    return localStorage.getItem('solar_white_bg') === 'true';
  });

  const toggleWhiteBackground = () => {
    setWhiteBackground((prev) => !prev);
  };

  // Auto-reset white background when switching to dark mode
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark' && whiteBackground) {
      setWhiteBackground(false);
    }
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem('solar_background_style', backgroundStyle);
  }, [backgroundStyle]);

  useEffect(() => {
    localStorage.setItem('solar_particle_count', particleCount.toString());
  }, [particleCount]);

  useEffect(() => {
    localStorage.setItem('solar_speed_multiplier', speedMultiplier.toString());
  }, [speedMultiplier]);

  useEffect(() => {
    localStorage.setItem('solar_font_theme', fontTheme);
  }, [fontTheme]);

  useEffect(() => {
    localStorage.setItem('solar_card_color_mode', cardColorMode);
  }, [cardColorMode]);

  useEffect(() => {
    localStorage.setItem('solar_white_bg', whiteBackground.toString());
    const root = document.documentElement;
    if (whiteBackground) {
      root.classList.add('white-bg');
    } else {
      root.classList.remove('white-bg');
    }
  }, [whiteBackground]);

  return (
    <BackgroundSettingsContext.Provider 
      value={{ 
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
      }}
    >
      {children}
    </BackgroundSettingsContext.Provider>
  );
};

export const useBackgroundSettings = () => {
  const context = useContext(BackgroundSettingsContext);
  if (!context) {
    throw new Error('useBackgroundSettings must be used within a BackgroundSettingsProvider');
  }
  return context;
};
