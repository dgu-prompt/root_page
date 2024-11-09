import { Container, Flex, Heading } from "@chakra-ui/react";

function Dashboard() {
  return (
    <Container>
      <Flex direction="column" gap={4} px="4"></Flex>
      <Heading size="3xl">Dashboard</Heading>
    </Container>
  );
}

export default Dashboard;
