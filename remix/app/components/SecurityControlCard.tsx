import { Box, Text, Flex } from "@chakra-ui/react";
import { Switch } from "~/components/ui/switch";

const SecurityControlCard = ({ control, isChecked, onToggle }) => (
  <Box p="4" borderWidth="1px" borderRadius="md" w="full" bg="bg">
    <Text fontWeight="bold" fontSize="lg">{control.Title}</Text>
    <Text fontSize="sm" color="gray.600">{control.Description}</Text>
    <Text fontSize="sm" fontWeight="semibold" mt="2">심각도: {control.SeverityRating}</Text>
    <Flex justify="space-between" align="center" mt="3">
      <Text fontSize="sm" color="gray.700">상태</Text>
      <Switch
        checked={isChecked}
        onCheckedChange={(e) => onToggle(e.checked)}
      />
    </Flex>
  </Box>
);

export default SecurityControlCard;