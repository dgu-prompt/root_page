"use client";

import type { JiraRule } from "rule";
import { useEffect, useState } from "react";
import { Box, Card, Spinner } from "@chakra-ui/react";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import YamlPreview from "./yaml-preview";

export default function YamlPreviewStep() {
  const [yamlPreview, setYamlPreview] = useState<string | null>(null);
  const jiraRuleData = useRuleEdit().ruleData as JiraRule;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/preview_yaml`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jiraRuleData),
        }
      );
      const yamlPreview = await data.json();
      setYamlPreview(yamlPreview.yamlPreview);
    }

    fetchData();
  }, []);

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>YAML 미리보기</Card.Title>
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
