import type { JiraRule } from "rule";
import { useEffect } from "react";
import { Fieldset, HStack, Flex, Icon, Text } from "@chakra-ui/react";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import { RadioGroup, Radio } from "@/components/ui/radio";
import {
  ChevronsDown,
  ChevronDown,
  Equal,
  ChevronUp,
  ChevronsUp,
} from "lucide-react";

const priorityConfig = [
  {
    value: "0",
    color: "red.solid",
    icon: ChevronsUp,
    label: "Highest",
  },
  {
    value: "1",
    color: "orange.solid",
    icon: ChevronUp,
    label: "High",
  },
  {
    value: "2",
    color: "yellow.solid",
    icon: Equal,
    label: "Medium",
  },
  {
    value: "3",
    color: "teal.solid",
    icon: ChevronDown,
    label: "Low",
  },
  {
    value: "4",
    color: "blue.solid",
    icon: ChevronsDown,
    label: "Lowest",
  },
];

export default function JiraPriorityRadioGroup() {
  const { ruleData, setRuleData } = useRuleEdit();

  const handleRadioChange =
    (field: keyof JiraRule) => (e: { value: string }) => {
      setRuleData((prev) => ({
        ...prev,
        [field]: e.value,
      }));
    };

  useEffect(() => {
    console.log("ruleData changed:", ruleData);
  }, [ruleData]);

  return (
    <Fieldset.Root>
      <Fieldset.Legend>우선 순위</Fieldset.Legend>
      <RadioGroup
        value={(ruleData as JiraRule).priority}
        onValueChange={handleRadioChange("priority")}
      >
        <HStack gap="6">
          {priorityConfig.map((config) => (
            <Radio key={config.value} value={config.value}>
              <Flex align="center" gap="2">
                <Icon color={config.color}>
                  <config.icon />
                </Icon>
                <Text>{config.label}</Text>
              </Flex>
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </Fieldset.Root>
  );
}
