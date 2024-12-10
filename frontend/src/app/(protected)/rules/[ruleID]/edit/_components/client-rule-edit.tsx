"use client";

import type { Rule } from "rule";
import { useEffect, useState } from "react";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import { useRegion } from "@/app/(protected)/_contexts/region-context";
import { RuleEditContext } from "../_contexts/rule-edit-context";
import StepContent from "./step-content";
import StepsSidebar from "./steps-sidebar";

export default function ClientRuleEdit({
  initialRuleData,
}: {
  initialRuleData: Rule;
}) {
  const [ruleData, setRuleData] = useState<Rule>(initialRuleData);
  const [currentStep, setCurrentStep] = useState(0);
  const { currentRegion } = useRegion();

  useEffect(() => {
    if (ruleData.region === "") {
      setRuleData({ ...ruleData, region: currentRegion });
    }
  }, [currentRegion]);

  return (
    <RuleEditContext.Provider
      value={{
        ruleData,
        setRuleData,
        currentStep,
        setCurrentStep,
      }}
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <StepContent />
        </GridItem>
        <GridItem colSpan={1}>
          <StepsSidebar />
        </GridItem>
      </SimpleGrid>
    </RuleEditContext.Provider>
  );
}
