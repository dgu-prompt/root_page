export type RuleType = "jira" | "slack";

export type RegionData = string[]; // e.g., ["us-east-1", "us-west-2"]

export type Assignee = {
  assigneeId: string;
  assigneeName: string;
  hasRuleFile: boolean;
};

export interface Rule {
  id: string;
  name: string;
  filename: string;
  type: RuleType;
}
