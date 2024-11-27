import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface Controls {
  ruleData: Rule;
  setRuleData: Dispatch<SetStateAction<Rule>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const ControlsContext = createContext<Controls | null>(null);

export function useGetControls() {
  const ruleEdit = useContext(ControlsContext);
  if (!ruleEdit) {
    throw new Error("useGetRuleEdit must be used within a Provider");
  }
  return ruleEdit;
}

// 이거하다 잠
