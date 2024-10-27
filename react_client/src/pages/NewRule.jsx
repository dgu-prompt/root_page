import { useState } from "react";
import axios from "axios";

import { Container, Text, Button, VStack, Box } from "@chakra-ui/react";
import SlackNotificationSettings from "./SlackNotificationSettings";
import JiraNotificationSettings from "./JiraNotificationSettings";
import AlertContent from "./AlertContent";
import JinjaTemplateEditor from "./JinjaTemplateEditor";
import RuleForm from "../components/RuleForm";
import AlertForm from "../components/AlertForm";
import JiraForm from "../components/JiraForm";
import SlackForm from "../components/SlackForm";

function NewRule() {
  const [ruleData, setRuleData] = useState({
    name: "",
    index: "",
    num_events: 1,
  });
  const [alertData, setAlertData] = useState({
    alert_subject: "",
    alert_text: "",
  });
  const [jiraData, setJiraData] = useState({
    jira_server: "",
    jira_project: "",
  });
  const [slackData, setSlackData] = useState({ webhook_url: "" });

  const handleSave = async () => {
    const fullData = { ...ruleData, ...alertData, ...jiraData, ...slackData };
    try {
      await axios.post("http://localhost:5001/test", fullData);
      alert("규칙이 저장되었습니다.");
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        규칙 편집
      </Text>

      <RuleForm ruleData={ruleData} setRuleData={setRuleData} />
      <AlertForm alertData={alertData} setAlertData={setAlertData} />
      <JiraForm jiraData={jiraData} setJiraData={setJiraData} />
      <SlackForm slackData={slackData} setSlackData={setSlackData} />

      <Button colorPalette="teal" onClick={handleSave} mt={4}>
        설정 저장
      </Button>

      <SlackNotificationSettings />
      <JiraNotificationSettings />
      <AlertContent />
      <JinjaTemplateEditor />
    </Container>
  );
}

export default NewRule;
