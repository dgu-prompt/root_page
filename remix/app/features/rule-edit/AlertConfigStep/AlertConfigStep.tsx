import { Box, Card, Flex, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { JiraRuleProps } from "@features/rule-edit/JiraRuleData";

import ConfigAlertJira from "./ConfigAlertJira";

export default function StepTwo({
  jiraRuleData,
  setJiraRuleData,
}: JiraRuleProps) {
  const { t } = useTranslation();

  return (
    <Flex direction={{ base: "column", md: "row" }} gap="16">
      {/* Left Side - Rule Editing Form */}
      <Box flex="1">
        <Stack gap="8">
          <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
            <Card.Header>
              <Card.Title>{t("ruleForm.jiraTitle")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ConfigAlertJira
                jiraRuleData={jiraRuleData}
                setJiraRuleData={setJiraRuleData}
              />
            </Card.Body>
          </Card.Root>
          {/* 
          <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
            <Card.Header>
              <Card.Title>{t("ruleForm.alertTitle")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <AlertConfiguration />
            </Card.Body>
          </Card.Root>

          <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
            <Card.Header>
              <Card.Title>{t("ruleForm.generalTitle")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ConfigGeneral formData={undefined} setFormData={undefined} />
            </Card.Body>
          </Card.Root> */}
        </Stack>
      </Box>
    </Flex>
  );
}
