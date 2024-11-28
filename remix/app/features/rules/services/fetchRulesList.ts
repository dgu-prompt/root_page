import { useRules } from "../contexts/mockRuleContext";
import { Rule as RuleListItem } from "./types";
import { Rule } from "@features/RuleEdit/services/types";

export default async function fetchRulesList(region: string) {
  return mockFetchRulesList(region);
}

async function mockFetchRulesList(region: string): Promise<RuleListItem[]> {
  await new Promise((r) => setTimeout(r, 1000));
  return mockRulesList[region];
}

export const convertRulesToListItems = (rules: Rule[]): RuleListItem[] => {
  return rules.map((rule) => ({
    id: rule.id,
    name: rule.name,
    filename: rule.filename,
    type: rule.alertType,
  }));
};

const mockRulesList: Record<string, RuleListItem[]> = {
  "us-east-1": [
    {
      id: "rule-1",
      name: "Rule 1",
      filename: "rule-1.yaml",
      type: "jira",
    },
  ],
  "us-west-1": [
    {
      id: "rule-2",
      name: "Rule 2",
      filename: "rule-2.yaml",
      type: "jira",
    },
    {
      id: "rule-3",
      name: "Rule 3",
      filename: "rule-3.yaml",
      type: "slack",
    },
  ],
  "ap-northeast-2": [
    {
      id: "rule-4",
      name: "Rule 4",
      filename: "rule-4.yaml",
      type: "jira",
    },
    {
      id: "rule-5",
      name: "Rule 5",
      filename: "rule-5.yaml",
      type: "jira",
    },
    {
      id: "rule-6",
      name: "Rule 6",
      filename: "rule-6.yaml",
      type: "jira",
    },
  ],
};
