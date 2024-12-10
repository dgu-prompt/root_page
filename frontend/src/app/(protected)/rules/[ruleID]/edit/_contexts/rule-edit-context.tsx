import type { Rule } from "rule";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface RuleEdit {
  ruleData: Rule;
  setRuleData: Dispatch<SetStateAction<Rule>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const RuleEditContext = createContext<RuleEdit | null>(null);

export function useRuleEdit() {
  const ruleEdit = useContext(RuleEditContext);
  if (!ruleEdit) {
    throw new Error("useRuleEdit must be used within a Provider");
  }
  return ruleEdit;
}
