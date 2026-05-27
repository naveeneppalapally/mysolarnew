/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface LoaderDoneContextType {
  loaderDone: boolean;
}

const LoaderDoneContext = createContext<LoaderDoneContextType>({ loaderDone: false });

export function LoaderDoneProvider({
  children,
  delay = 1800,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    // Fire slightly AFTER the loader finishes (1700ms) so animations start fresh
    const timer = setTimeout(() => setLoaderDone(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <LoaderDoneContext.Provider value={{ loaderDone }}>
      {children}
    </LoaderDoneContext.Provider>
  );
}

export function useLoaderDone() {
  return useContext(LoaderDoneContext);
}
