import { Box, Flex, Heading, Separator, Textarea } from "@chakra-ui/react";
import AlertConfiguration from "~/components/config/alert/configalert";
import { useState } from "react";

function RuleEditPage() {
  const [yamlPreview] = useState(`
name: Sample Rule
type: frequency
index: security-events
threshold: 50
alert:
  - "slack"
  - "jira"
slack:
  webhook_url: "https://hooks.slack.com/services/XXX/YYY/ZZZ"
  channel: "#alerts"
jira:
  project_key: "ALERT"
  issue_type: "Bug"
  priority: "High"
filter:
  - query_string:
      query: "severity:high AND status:open"
timeframe:
  minutes: 15
realert:
  minutes: 30
`);

  return (
    <>
      <Flex align="flex-start" gap="4">
        {/* Left Side - Rule Editing Form */}
        <Box flex="1" p="4">
          <AlertConfiguration />
        </Box>

        <Separator orientation="vertical" />

        {/* Right Side - YAML Preview */}
        <Box flex="1" p="4" bg="bg.subtle" borderRadius="md">
          <Heading size="md" mb="4">
            YAML Preview
          </Heading>
          <Textarea
            defaultValue={yamlPreview}
            readOnly
            h="full"
            bg="gray.100"
            fontFamily="monospace"
            resize="none"
          />
        </Box>
      </Flex>
    </>
  );
}

export default RuleEditPage;
