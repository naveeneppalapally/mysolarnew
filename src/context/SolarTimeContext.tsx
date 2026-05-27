/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useMemo } from 'react';

export type SolarPhase = 'dawn' | 'noon' | 'dusk' | 'night';

interface SolarTimeContextType {
  timeOfDay: number; // 0 to 24 hours
  setTimeOfDay: (time: number) => void;
  currentPhase: SolarPhase;
}

const SolarTimeContext = createContext<SolarTimeContextType | undefined>(undefined);

export const SolarTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 12 (Noon)
  const [timeOfDay, setTimeOfDay] = useState<number>(12);

  const currentPhase = useMemo<SolarPhase>(() => {
    if (timeOfDay >= 6 && timeOfDay < 9) return 'dawn';
    if (timeOfDay >= 9 && timeOfDay < 17) return 'noon';
    if (timeOfDay >= 17 && timeOfDay < 20) return 'dusk';
    return 'night';
  }, [timeOfDay]);

  const value = useMemo(() => ({
    timeOfDay,
    setTimeOfDay,
    currentPhase,
  }), [timeOfDay, currentPhase]);

  return (
    <SolarTimeContext.Provider value={value}>
      {children}
    </SolarTimeContext.Provider>
  );
};

export const useSolarTime = () => {
  const context = useContext(SolarTimeContext);
  if (!context) {
    throw new Error('useSolarTime must be used within a SolarTimeProvider');
  }
  return context;
};
