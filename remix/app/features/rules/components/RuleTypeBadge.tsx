import { Badge } from "@chakra-ui/react";
import { RuleType } from "../services/types";

const ruleTypeBadgeConfig = {
  jira: { label: "Jira", color: "blue" },
  slack: { label: "Slack", color: "purple" },
};

interface RuleTypeBadgeProps {
  type: RuleType;
}

export default function RuleTypeBadge({ type }: RuleTypeBadgeProps) {
  return (
    <Badge colorPalette={ruleTypeBadgeConfig[type].color}>
      {ruleTypeBadgeConfig[type].label}
    </Badge>
  );
}
