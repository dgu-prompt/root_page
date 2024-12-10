"use client";
import React, { JSX } from "react";

import { Stack } from "@chakra-ui/react";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import GeneralConfigSection from "./general-config-section";
import ControlConfigSection from "./control-config-section";
import JiraConfigSection from "./jira-config-section";
import YamlPreviewStep from "./yaml-preview-step";

export default function StepContent() {
  const { currentStep } = useRuleEdit();

  const steps: { [key: number]: JSX.Element } = {
    0: (
      <Stack gap="6">
        <GeneralConfigSection />
        <ControlConfigSection />
        <JiraConfigSection />
      </Stack>
    ),
    1: <YamlPreviewStep />,
  };

  return steps[currentStep] || null;
}
