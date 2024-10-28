import { Input, Stack, Box, Text } from "@chakra-ui/react";

function RuleForm({ ruleData, setRuleData }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      p={4}
      borderRadius="md"
      mb={4}
    >
      <Text fontWeight="bold">기본 정보</Text>
      <Stack spacing={3} mt={2}>
        <Input
          placeholder="Rule Name"
          value={ruleData.name}
          onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
        />
        <Input
          placeholder="Index Pattern"
          value={ruleData.index}
          onChange={(e) => setRuleData({ ...ruleData, index: e.target.value })}
        />
        <Input
          placeholder="Number of Events"
          type="number"
          value={ruleData.num_events}
          onChange={(e) =>
            setRuleData({ ...ruleData, num_events: e.target.value })
          }
        />
      </Stack>
    </Box>
  );
}

export default RuleForm;
