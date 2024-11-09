import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Box,
  Text,
  Flex,
  Spinner,
  Alert,
  Card,
  Grid,
} from "@chakra-ui/react";
import { LuShieldCheck } from "react-icons/lu";

function StandardsPage() {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchStandards = async () => {
    try {
      const response = await axios.get("http://localhost:5101/standards"); // Flask API 호출
      setStandards(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load standards data.");
      console.error("Error fetching standards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, []);

  return (
    <Container>
      <Flex px="4" gap="4" direction="column">
        <Heading size="3xl">보안 표준</Heading>

        {loading && (
          <Box textAlign="center" py={6}>
            <Spinner size="lg" />
            <Text>Loading standards data...</Text>
          </Box>
        )}

        {error && (
          <Alert status="error" mb={6}>
            {error}
          </Alert>
        )}

        <Grid
          templateColumns={{ base : "repeat(1, 1fr)", md : "repeat(2, 1fr)" }}
          gap="4"
        >
          {standards.map((standard) => (
            <Card.Root>
              <Card.Header>
                <Card.Title>{standard.Name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Description>{standard.Description}</Card.Description>
              </Card.Body>
              <Card.Footer>
                <Flex align="center">
                  {standard.Enabled && (
                    <LuShieldCheck size="18" style={{ marginRight: "4px" }} />
                  )}
                  <Text fontSize="sm">
                    {standard.Enabled ? "활성화됨" : "비활성화됨"}
                  </Text>
                </Flex>
              </Card.Footer>
            </Card.Root>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}

export default StandardsPage;
