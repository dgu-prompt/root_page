import { createContext, useContext } from "react";

import type { ToggleControlStatusFunction } from "../types/controls-types";

const ToggleControlStatusContext =
  createContext<ToggleControlStatusFunction | null>(null);

export const useToggleControlStatus = () => {
  const context = useContext(ToggleControlStatusContext);
  if (!context) {
    throw new Error(
      "useToggleControl must be used within a ToggleControlProvider"
    );
  }
  return context;
};

type ToggleControlStatusProviderProps = {
  children: React.ReactNode;
  toggleControlStatus: ToggleControlStatusFunction;
};

export const ToggleControlStatusProvider = (
  props: ToggleControlStatusProviderProps
) => {
  const { children, toggleControlStatus } = props;

  return (
    <ToggleControlStatusContext.Provider value={toggleControlStatus}>
      {children}
    </ToggleControlStatusContext.Provider>
  );
};
