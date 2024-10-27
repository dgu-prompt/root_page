import { useParams } from 'react-router-dom';
import { Container, Text } from "@chakra-ui/react";

function RuleDetail() {
  const { ruleId } = useParams();
  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="2xl" fontWeight="bold">Rule Detail</Text>
      <Text mt={2}>Displaying details for Rule ID: {ruleId}</Text>
    </Container>
  );
}

export default RuleDetail;