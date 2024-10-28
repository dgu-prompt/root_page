import { Input, Stack, Box, Text } from "@chakra-ui/react";

function SlackForm({ slackData, setSlackData }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      p={4}
      borderRadius="md"
      mb={4}
    >
      <Text fontWeight="bold">Slack 설정</Text>
      <Stack spacing={3} mt={2}>
        <Input
          placeholder="Slack Webhook URL"
          value={slackData.webhook_url}
          onChange={(e) =>
            setSlackData({ ...slackData, webhook_url: e.target.value })
          }
        />
      </Stack>
    </Box>
  );
}

export default SlackForm;
