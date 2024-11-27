export type AlertType = "jira" | "slack";

interface BaseRule {
  id: string;
  name: string;
  filename: string;
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

export function isJiraRule(rule: Rule): rule is JiraRule {
  return rule.alertType === "jira";
}

export function isSlackRule(rule: Rule): rule is SlackRule {
  return rule.alertType === "slack";
}
