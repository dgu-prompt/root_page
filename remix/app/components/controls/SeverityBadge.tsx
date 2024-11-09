import { Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFORMATIONAL";

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const { t } = useTranslation();

  // 각 심각도에 따른 색상 및 다국어 텍스트 설정
  const severityConfig = {
    CRITICAL: { color: "purple", label: t("severityCritical") },
    HIGH: { color: "red", label: t("severityHigh") },
    MEDIUM: { color: "orange", label: t("severityMedium") },
    LOW: { color: "yellow", label: t("severityLow") },
    INFORMATIONAL: { color: "gray", label: t("severityInformational") },
  };

  const { color, label } = severityConfig[severity];

  return <Badge colorPalette={color}>{label}</Badge>;
};

export default SeverityBadge;
