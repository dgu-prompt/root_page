"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const RegionContext = createContext<{
  regions: string[];
  currentRegion: string;
  setCurrentRegion: (region: string) => void;
} | null>(null);

export function RegionProvider({
  regions,
  initialRegion,
  children,
}: {
  regions: string[];
  initialRegion: string;
  children: ReactNode;
}) {
  const [currentRegion, setCurrentRegion] = useState(initialRegion);

  return (
    <RegionContext.Provider
      value={{ regions: regions, currentRegion, setCurrentRegion }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
