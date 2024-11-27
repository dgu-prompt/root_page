import { Badge } from "@chakra-ui/react";

import { Severity } from "../types/typesV2";

type SeverityConfig = {
  color: string;
  label: string;
};

function getDefaultSeverityConfig(): Record<Severity, SeverityConfig> {
  return {
    low: { color: "yellow", label: "낮음" },
    medium: {
      color: "orange",
      label: "보통",
    },
    high: { color: "red", label: "높음" },
    critical: {
      color: "purple",
      label: "매우 높음",
    },
  };
}

type SeverityBadgeProps = {
  severity: Severity;
  customConfig?: Partial<Record<Severity, SeverityConfig>>;
};

export default function SeverityBadge(props: SeverityBadgeProps) {
  const { severity, customConfig } = props;

  const defaultConfig = getDefaultSeverityConfig();
  const SeverityConfig = { ...defaultConfig, ...customConfig };
  const { color, label } = SeverityConfig[severity];

  return <Badge colorPalette={color}>{label}</Badge>;
}
