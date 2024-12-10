import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  ChevronsDown,
  ChevronDown,
  Equal,
  ChevronUp,
  ChevronsUp,
} from "lucide-react";

interface PriorityConfig {
  color: string;
  icon: React.ElementType;
  label: string;
}

type JiraPriority = "lowest" | "low" | "medium" | "high" | "highest";

function getDefaultPriorityConfig(): Record<JiraPriority, PriorityConfig> {
  return {
    lowest: {
      color: "blue.solid",
      icon: ChevronsDown,
      label: "Lowest",
    },
    low: {
      color: "teal.solid",
      icon: ChevronDown,
      label: "Low",
    },
    medium: {
      color: "yellow.solid", // Yellow
      icon: Equal,
      label: "Medium",
    },
    high: {
      color: "orange.solid", // Orange
      icon: ChevronUp,
      label: "High",
    },
    highest: {
      color: "red.solid", // Dark red
      icon: ChevronsUp,
      label: "Highest",
    },
  };
}

interface PriorityIndicatorProps {
  priority: JiraPriority;
}

export default function PriorityIndicator({
  priority,
}: PriorityIndicatorProps) {
  const config = getDefaultPriorityConfig()[priority];
  const PriorityIcon = config.icon;

  return (
    <Flex align="center" gap="1">
      <Icon color={config.color}>
        <PriorityIcon />
      </Icon>
      <Text>{config.label}</Text>
    </Flex>
  );
}
