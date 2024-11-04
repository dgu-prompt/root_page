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

  switch (severity) {
    case "CRITICAL":
      return <Badge colorPalette={colorPalette}>매우 중요</Badge>;
    case "HIGH":
      return <Badge colorPalette={colorPalette}>높음</Badge>;
    case "MEDIUM":
      return <Badge colorPalette={colorPalette}>보통</Badge>;
    case "LOW":
      return <Badge colorPalette={colorPalette}>낮음</Badge>;
    default:
      break;
  }
};

export default SeverityBadge;
