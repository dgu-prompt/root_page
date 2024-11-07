import { Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SeverityBadge = ({
  severity,
}: {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}) => {
  const { t } = useTranslation();

  // 상태별 컬러 팔레트 설정
  const colorPalette = {
    CRITICAL: "purple",
    HIGH: "red",
    MEDIUM: "orange",
    LOW: "yellow",
  }[severity];

  // 상태별 텍스트를 다국어 리소스에서 가져오기
  const severityText = {
    CRITICAL: t("severityCritical"),
    HIGH: t("severityHigh"),
    MEDIUM: t("severityMedium"),
    LOW: t("severityLow"),
  }[severity];

  return <Badge colorPalette={colorPalette}>{severityText}</Badge>;
};

export default SeverityBadge;
