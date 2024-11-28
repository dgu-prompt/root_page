import { Box, Card, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { JiraRuleData } from "../JiraRuleData";

import YamlPreview from "./YamlPreview";

import { generateYamlPreview } from "@features/rules/services/rules";
import { useRules } from "@features/rules/contexts/mockRuleContext";
import { useGetRuleEdit } from "@features/RuleEdit/contexts/RuleEditContext";
import { JiraRule } from "@features/RuleEdit/services/types";
import yaml from "js-yaml";

const generateRuleYaml = (jiraRule) => {
  // YAML 규칙 데이터
  const ruleData = {
    name: `${jiraRule.name}`,
    type: "any",
    index: "latest_securityhub_findings",
    timestamp_field: "aws.securityhub_findings.updated_at",
    filter: [
      {
        term: {
          "aws.securityhub_findings.product.name.keyword": "Security Hub",
        },
      },
      {
        range: {
          "aws.securityhub_findings.updated_at": {
            gte: "now-24h",
            lte: "now",
            time_zone: "+09:00",
          },
        },
      },
      {
        terms: {
          "aws.securityhub_findings.generator.id.keyword":
            jiraRule.controlIds.map((id) => `security-control/${id}`),
        },
      },
    ],
    aggregation: {
      minutes: 1,
      aggregation_key: "aws.securityhub_findings.generator.id.keyword",
    },
    realert: {
      minutes: 0,
    },
    alert: ["jira"],
    jira_server: "https://donggukicip.atlassian.net/",
    jira_project: jiraRule.project || "VT",
    jira_issuetype: "Task",
    jira_bump_tickets: true,
    jira_watchers: ["mandar2n09@gmail.com"],
    jira_account_file: "/opt/elastalert/rules/account_file.json",
    jira_assignee: jiraRule.assignee,
    jira_max_age: 1,

    alert_subject:
      `${jiraRule.alertSubject}` || "Alert triggered! *({0} Matches!)*",
    alert_subject_args: ["num_hits"],
    alert_text:
      `${jiraRule.alertText}` ||
      `* *AWS Account ID*: {0}\n* *Findings updated at*: {1}\n* *Description*: {2}\n* *Compliance Status*: {4}\n* *Remediation Text*: {5}\n* *Remediation URL*: {6}`,
    alert_text_args: [
      "aws.securityhub_findings.aws_account_id",
      "aws.securityhub_findings.updated_at",
      "aws.securityhub_findings.description",
      "aws.securityhub_findings.severity.label",
      "aws.securityhub_findings.compliance.status",
      "aws.securityhub_findings.remediation.recommendation.text",
      "aws.securityhub_findings.remediation.recommendation.url",
      "aws.securityhub_findings.title",
      "aws.securityhub_findings.generator.id",
      "num_hits",
    ],
    alert_text_type: "alert_text_only",
  };

  return yaml.dump(ruleData);
};

export default function StepThree() {
  const [yamlPreview, setYamlPreview] = useState<string | null>(null);
  const jiraRuleData = useGetRuleEdit().ruleData as JiraRule;

  useEffect(() => {
    const yamlContent = generateRuleYaml(jiraRuleData);
    console.log("yamlContent", yamlContent);
    setYamlPreview(yamlContent);
  }, [jiraRuleData]);

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>YAML Preview</Card.Title>
      </Card.Header>
      <Card.Body position="relative">
        <Box position="sticky" top="20">
          {yamlPreview ? (
            <YamlPreview content={yamlPreview} />
          ) : (
            <Spinner size="lg" />
          )}
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
