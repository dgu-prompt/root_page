import type { Severity } from "control";
import { Badge } from "@chakra-ui/react";

export default function SeverityBadge({ severity }: { severity: Severity }) {
  const severityConfig: Record<Severity, { label: string; color: string }> = {
    low: { label: "낮음", color: "yellow" },
    medium: { label: "보통", color: "orange" },
    high: { label: "높음", color: "red" },
    critical: { label: "매우 중요", color: "purple" },
  };

  const normalizedSeverity = severity.toLowerCase() as Severity;
  const config = severityConfig[normalizedSeverity] || {
    color: "gray",
    label: "알 수 없음",
  };
  return <Badge colorPalette={config.color}>{config.label}</Badge>;
}
