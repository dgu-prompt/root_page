const yamlData = `name: elastic alert test
type: any
index: .ds-logs-aws.securityhub_findings-default-* 
num_events: 1
timeframe:
  hours: 4
realert:
  minutes: 0  # 모든 이벤트에 대해 알림을 보냅니다.
alert:
- "slack"
slack_webhook_url: "https://hooks.slack.com/services/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"
slack_channel: "#log-alert"
slack_username: "ElastAlert Bot"
icon_emoji: ":ghost:"
alert_text: |-
  *Description:* {1}
  *Compliance Status:* {3}
  *Remediation Text:* {4}
  *Remediation URL:* <{5}|Click here for more information(url)>
alert_text_args:
  - aws.securityhub_findings.aws_account_id
  - aws.securityhub_findings.description
  - aws.securityhub_findings.severity.label
  - aws.securityhub_findings.compliance.status
  - aws.securityhub_findings.remediation.recommendation.text
  - aws.securityhub_findings.remediation.recommendation.url
alert_text_type: alert_text_only
alert_subject: "Security Hub - Severity: {0}"
alert_subject_args:
  - aws.securityhub_findings.severity.label`;

export default yamlData;
