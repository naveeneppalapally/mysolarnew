/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export type BackgroundStyle = 
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

interface BackgroundSettingsContextType {
  backgroundStyle: BackgroundStyle;
  setBackgroundStyle: (style: BackgroundStyle) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
  speedMultiplier: number;
  setSpeedMultiplier: (multiplier: number) => void;
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

  useEffect(() => {
    localStorage.setItem('solar_background_style', backgroundStyle);
  }, [backgroundStyle]);

  useEffect(() => {
    localStorage.setItem('solar_particle_count', particleCount.toString());
  }, [particleCount]);

  useEffect(() => {
    localStorage.setItem('solar_speed_multiplier', speedMultiplier.toString());
  }, [speedMultiplier]);

  return (
    <BackgroundSettingsContext.Provider 
      value={{ 
        backgroundStyle, 
        setBackgroundStyle, 
        particleCount, 
        setParticleCount, 
        speedMultiplier, 
        setSpeedMultiplier 
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
