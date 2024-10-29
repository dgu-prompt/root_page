import { Container, Flex, Heading } from "@chakra-ui/react";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import RuleForm from "../components/RuleForm";
import { Link } from "react-router-dom";

const mockRuleData = {
  name: "High Severity Alert for EC2 Instances",
  description: "Alerts on high severity findings in EC2 instances.",
  severity: "HIGH",
  status: "enabled",
  notifications: ["Jira", "Slack"],
};

function RuleEditPage() {
  const handleEditRule = (formData: any) => {
    // TODO: API 요청을 통해 규칙 업데이트 로직 추가
    console.log("Updating rule with data:", formData);
  };

  return (
    <Container>
      <Flex direction="column" gap={4} px="4">
        <BreadcrumbRoot>
          <BreadcrumbLink asChild>
            <Link to="/rules">Rules</Link>
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>{mockRuleData.name}</BreadcrumbCurrentLink>
        </BreadcrumbRoot>
        <Heading size="3xl">Edit Rule</Heading>
        <RuleForm ruleData={mockRuleData} onSubmit={handleEditRule} />
      </Flex>
    </Container>
  );
}

export default RuleEditPage;
