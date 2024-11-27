import { useState } from "react";
import { Rule } from "../services/types";

export default function useRuleData(initialRuleData: Rule) {
  const [ruleData, setRuleData] = useState<Rule>(initialRuleData);

  const updateField = (field: keyof Rule, value: unknown) => {
    setRuleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { ruleData, updateField };
}
