import { createContext, Dispatch, SetStateAction, useContext } from "react";
import type { Rule } from "../services/types";

interface RuleEdit {
  ruleData: Rule;
  setRuleData: Dispatch<SetStateAction<Rule>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const RuleEditContext = createContext<RuleEdit | null>(null);

export function useGetRuleEdit() {
  const ruleEdit = useContext(RuleEditContext);
  if (!ruleEdit) {
    throw new Error("useGetRuleEdit must be used within a Provider");
  }
  return ruleEdit;
}
