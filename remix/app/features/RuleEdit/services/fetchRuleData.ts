import { Rule } from "./types";

export default async function fetchRuleData(ruleId: string) {
  return mockFetchRuleData(ruleId);
}

async function mockFetchRuleData(ruleId: string): Promise<Rule> {
  await new Promise((r) => setTimeout(r, 1000));
  return mockRuleData.find((r) => r.id === ruleId)!;
}

const mockRuleData: Rule[] = [
  {
    id: "rule-1",
    name: "Rule 1",
    filename: "rule-1.yaml",
    alertType: "jira",
    alertSubject: "Rule 1",
    alertText: "This is rule 1",
    region: "us-east-1",
    controlIds: ["EC2.1"],
    project: "VT",
    assignee: "mandar2n09@gmail.com",
  },
  {
    id: "rule-2",
    name: "Rule 2",
    filename: "rule-2.yaml",
    alertType: "jira",
    alertSubject: "Rule 2",
    alertText: "This is rule 2",
    region: "us-west-1",
    controlIds: ["EC2.2"],
    project: "VT",
    assignee: "glagudvlf821@gmail.com",
  },
  {
    id: "rule-3",
    name: "Rule 3",
    filename: "rule-3.yaml",
    alertType: "slack",
    alertText: "This is rule 3",
    region: "us-west-1",
    controlIds: ["EC2.3"],
    slack_webhook_url:
      "https://hooks.slack.com/services/EXAMPLE/THIS/WONT-WORK",
  },
  {
    id: "rule-4",
    name: "Rule 4",
    filename: "rule-4.yaml",
    alertType: "jira",
    alertSubject: "Rule 4",
    alertText: "This is rule 4",
    region: "ap-northeast-2",
    controlIds: ["EC2.19", "RDS.2", "IAM.6", "IAM.9", "S3.2"],
    project: "VT",
    assignee: "mandar2n09@gmail.com",
  },
  {
    id: "rule-5",
    name: "Rule 5",
    filename: "rule-5.yaml",
    alertType: "jira",
    alertSubject: "Rule 5",
    alertText: "This is rule 5",
    region: "ap-northeast-2",
    controlIds: ["EC2.5"],
    project: "VT",
    assignee: "daeyong.jeong.18@gmail.com",
  },
  {
    id: "rule-6",
    name: "Rule 6",
    filename: "rule-6.yaml",
    alertType: "jira",
    alertSubject: "Rule 6",
    alertText: "This is rule 6",
    region: "ap-northeast-2",
    controlIds: ["EC2.6"],
    project: "VT",
    assignee: "daeyong.jeong.18@gmail.com",
  },
];
