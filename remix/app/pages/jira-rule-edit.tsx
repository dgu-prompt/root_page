import { Button } from "@/components/ui/button";
import { StepsItem, StepsList, StepsRoot } from "@/components/ui/steps";
import {
  Card,
  Container,
  Flex,
  GridItem,
  Group,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AlertConfigStep from "@features/rule-edit/AlertConfigStep/AlertConfigStep";
import { JiraRuleData } from "@features/rule-edit/JiraRuleData";
import SelectControlsStep from "@features/rule-edit/SelectControlsStep/SelectControlsStep";
import YamlPreviewStep from "@features/rule-edit/YamlPreviewStep/YamlPreviewStep";
import { fetchAssigneeDetails } from "@features/rules/services/rules";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { awsRegion, assigneeId = "defaultAssigneeId" } = params;

  // Log the params to ensure the values are being received correctly
  console.log("Params:");
  console.log("awsRegion:", awsRegion);
  console.log("assigneeId:", assigneeId);

  const region = awsRegion || "defaultRegion";

  const assigneeDetails = await fetchAssigneeDetails(assigneeId);

  return json({
    assigneeDetails,
    region,
  });
};

export default function EditRulePage() {
  const { assigneeDetails, region } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const [jiraRuleData, setJiraRuleData] = useState<JiraRuleData>({
    awsRegion: region,
    alertType: "jira" as "jira" | "slack",
    jiraAssignee: assigneeDetails.assigneeId,
    modifiedSecurityControlIds: {
      added: [],
      removed: [],
    },
    alertSubject: "",
    alertText: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleSubmit = () => {
    console.log("Final ruleData:", jiraRuleData);
  };

  return (
    <Container pt={{ base: "6", md: "8", lg: "10" }}>
      <Heading mb="2" size="2xl">
        Jira 알림 규칙 편집
      </Heading>
      <Text mb="4">
        편집 대상 담당자: {assigneeDetails.assigneeName} (
        {jiraRuleData.jiraAssignee})
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <GridItem colSpan={{ base: 1, md: 2 }}>
          {currentStep === 0 && (
            <SelectControlsStep
              jiraRuleData={jiraRuleData}
              setJiraRuleData={setJiraRuleData}
            />
          )}
          {currentStep === 1 && (
            <AlertConfigStep
              jiraRuleData={jiraRuleData}
              setJiraRuleData={setJiraRuleData}
            />
          )}
          {currentStep === 2 && <YamlPreviewStep jiraRuleData={jiraRuleData} />}
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Card.Root>
            <Card.Body>
              <StepsRoot
                count={3}
                defaultValue={0}
                height="300px"
                orientation="vertical"
                step={currentStep}
              >
                <StepsList>
                  <StepsItem
                    description={t("steps.step1.description")}
                    index={0}
                    title={t("steps.step1.title")}
                  />
                  <StepsItem
                    description={t("steps.step2.description")}
                    index={1}
                    title={t("steps.step2.title")}
                  />
                  <StepsItem
                    description={t("steps.step3.description")}
                    index={2}
                    title={t("steps.step3.title")}
                  />
                </StepsList>
              </StepsRoot>
            </Card.Body>
            <Card.Footer mt="4">
              <Flex justify="space-between" width="full">
                <Button asChild variant="surface">
                  <Link to="#">취소</Link>
                </Button>

                <Group>
                  <Button
                    disabled={currentStep === 0}
                    onClick={handlePrev}
                    variant="surface"
                  >
                    이전
                  </Button>
                  {currentStep < 2 ? (
                    <Button onClick={handleNext}>다음</Button>
                  ) : (
                    <Button onClick={handleSubmit}>제출</Button>
                  )}
                </Group>
              </Flex>
            </Card.Footer>
          </Card.Root>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
