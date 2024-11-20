import { Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import type { Severity } from "../types/controls-types";

type SeverityConfig = {
  color: string;
  label: string;
};

function getDefaultSeverityConfig(
  t: (key: string) => string
): Record<Severity, SeverityConfig> {
  return {
    LOW: { color: "yellow", label: t("controls.fields.severity.values.low") },
    MEDIUM: {
      color: "orange",
      label: t("controls.fields.severity.values.medium"),
    },
    HIGH: { color: "red", label: t("controls.fields.severity.values.high") },
    CRITICAL: {
      color: "purple",
      label: t("controls.fields.severity.values.critical"),
    },
  };
}

type SeverityBadgeProps = {
  severity: Severity;
  customConfig?: Partial<Record<Severity, SeverityConfig>>;
};

export default function SeverityBadge(props: SeverityBadgeProps) {
  const { severity, customConfig } = props;
  const { t } = useTranslation();

  const defaultConfig = getDefaultSeverityConfig(t);
  const SeverityConfig = { ...defaultConfig, ...customConfig };
  const { color, label } = SeverityConfig[severity];

  return <Badge colorPalette={color}>{label}</Badge>;
}
