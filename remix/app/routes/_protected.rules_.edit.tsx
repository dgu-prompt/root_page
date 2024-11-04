import {
  Box,
  Code,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import RuleForm from "~/components/RuleForm";
import YamlPreview from "~/components/YamlPreview";
import { useState } from "react";
import yamlData from "~/data/yamlData";

function RuleEditPage() {
  const [ruleData, setRuleData] = useState({
    name: "",
    description: "",
    alerts: { slack: false, jira: false },
  });
  const [yamlContent] = useState(yamlData);

  const handleRuleChange = (updatedData) => {
    setRuleData(updatedData);
    // setYamlContent(generateYaml(updatedData)); // 설정 변경 시 YAML 업데이트 함수 호출
  };

  return (
    <Container pt="16">
      <Flex direction={{ base: "column", md: "row" }} gap="16">
        {/* Left Side - Rule Editing Form */}
        <Box flex="1">
          <HStack mb="8" alignItems="baseline">
            <Heading size="2xl">Edit Rule</Heading>
            <Code variant="plain" size="lg">
              samplerule.yaml
            </Code>
          </HStack>

          <RuleForm data={ruleData} onChange={handleRuleChange} />
        </Box>

        {/* Right Side - YAML Preview */}
        <Box flex="1" bg="bg.subtle" borderRadius="md" position="relative">
          <Box position="sticky" top="20">
            <Heading size="md" mb="4">
              YAML Preview
            </Heading>
            <YamlPreview content={yamlContent} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

export default RuleEditPage;
