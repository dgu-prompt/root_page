import type { AlertType } from "rule";
import { Badge } from "@chakra-ui/react";

const alertTypeBadgeConfig = {
  jira: { label: "Jira", color: "blue" },
  slack: { label: "Slack", color: "purple" },
};

export default function AlertTypeBadge({ type }: { type: AlertType }) {
  return (
    <Badge colorPalette={alertTypeBadgeConfig[type].color}>
      {alertTypeBadgeConfig[type].label}
    </Badge>
  );
}
