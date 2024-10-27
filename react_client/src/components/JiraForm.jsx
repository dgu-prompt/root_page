import React from "react";
import { Input, Stack, Box, Text } from "@chakra-ui/react";

function JiraForm({ jiraData, setJiraData }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      p={4}
      borderRadius="md"
      mb={4}
    >
      <Text fontWeight="bold">Jira 설정</Text>
      <Stack spacing={3} mt={2}>
        <Input
          placeholder="Jira Server URL"
          value={jiraData.jira_server}
          onChange={(e) =>
            setJiraData({ ...jiraData, jira_server: e.target.value })
          }
        />
        <Input
          placeholder="Jira Project Key"
          value={jiraData.jira_project}
          onChange={(e) =>
            setJiraData({ ...jiraData, jira_project: e.target.value })
          }
        />
      </Stack>
    </Box>
  );
}

export default JiraForm;
