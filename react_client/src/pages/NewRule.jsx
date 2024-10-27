import { Container, Text, Button, VStack, Box } from "@chakra-ui/react";
import SlackNotificationSettings from "./SlackNotificationSettings";
import JiraNotificationSettings from "./JiraNotificationSettings";
import AlertContent from "./AlertContent";
import JinjaTemplateEditor from "./JinjaTemplateEditor";

function NewRule() {
  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="2xl" fontWeight="bold">새 규칙 추가</Text>
      <Box my={4}>
        <VStack>
          <AlertContent />
          <JinjaTemplateEditor />
          <SlackNotificationSettings />
          <JiraNotificationSettings />
        </VStack>
      </Box>
      <Button mt={4} colorPalette="teal">규칙 추가하기</Button>
    </Container>
  );
}

export default NewRule;