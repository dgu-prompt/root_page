import { Badge } from "@chakra-ui/react";

const SeverityBadge = ({
  severity,
}: {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}) => {
  const colorPalette = {
    CRITICAL: "purple",
    HIGH: "red",
    MEDIUM: "orange",
    LOW: "yellow",
  }[severity];

  // 첫 글자만 대문자로 나머지는 소문자로 변환
  const formattedSeverity =
    severity.charAt(0) + severity.slice(1).toLowerCase();

  return <Badge colorPalette={colorPalette}>{formattedSeverity}</Badge>;
};

export default SeverityBadge;
