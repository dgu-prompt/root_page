declare module "rule" {
  export type AlertType = "jira" | "slack";

  interface BaseRule {
    filename: string;
    name: string;
    description: string;
    alertType: AlertType;
    alertSubject?: string;
    alertText: string;
    region: string;
    controlIds: string[];
    yamlPreview?: string;
  }

  export interface JiraRule extends BaseRule {
    alertType: "jira";
    project: string;
    assignee: string;
    priority?: string;
  }

  export interface SlackRule extends BaseRule {
    alertType: "slack";
    slack_webhook_url: string;
  }

  export type Rule = JiraRule | SlackRule;

  export interface RuleSummary {
    alertType: AlertType;
    description: string;
    filename: string;
    name: string;
  }

  export interface RegionalRuleSummary {
    count: number;
    region: string;
    yamlName: RuleSummary[];
  }

  export interface JiraAssigneeInfo {
    assigneeEmail: string;
    assigneeName: string;
    avatarUrl: string;
  }
}
