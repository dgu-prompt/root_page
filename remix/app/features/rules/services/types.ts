export type AlertType = "jira" | "slack";

export type RegionData = string[]; // e.g., ["us-east-1", "us-west-2"]

export type Assignee = {
  assigneeId: string;
  assigneeName: string;
  hasRuleFile: boolean;
};
