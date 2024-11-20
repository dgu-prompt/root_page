import { Box, Card, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { JiraRuleData } from "../JiraRuleData";

import YamlPreview from "./YamlPreview";

import { generateYamlPreview } from "@features/rules/services/rules";

export default function StepThree({
  jiraRuleData,
}: {
  jiraRuleData: JiraRuleData;
}) {
  const [yamlPreview, setYamlPreview] = useState<string | null>(null);

  useEffect(() => {
    generateYamlPreview(jiraRuleData).then((yaml) => setYamlPreview(yaml));
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
