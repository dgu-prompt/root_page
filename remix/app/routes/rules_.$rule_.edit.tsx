import { Box, Code, Container, Flex, HStack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import RuleForm from "~/components/RuleForm";
import YamlPreview from "~/components/YamlPreview";
import yamlData from "~/data/yamlData";

function RuleEditPage() {
  const { t } = useTranslation();

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
          <HStack alignItems="baseline" mb="8">
            <Heading size="2xl">{t("editRuleTitle")}</Heading>
            <Code size="lg" variant="plain">
              {t("yamlFileName")}
            </Code>
          </HStack>

          <RuleForm data={ruleData} onChange={handleRuleChange} />
        </Box>

        {/* Right Side - YAML Preview */}
        <Box bg="bg.subtle" borderRadius="md" flex="1" position="relative">
          <Box position="sticky" top="20">
            <Heading mb="4" size="md">
              {t("yamlPreviewTitle")}
            </Heading>
            <YamlPreview content={yamlContent} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

export default RuleEditPage;
