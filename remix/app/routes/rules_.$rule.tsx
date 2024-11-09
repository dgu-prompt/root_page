import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuFiles, LuPenSquare, LuTrash } from "react-icons/lu";
import { Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Tag } from "~/components/ui/tag";

function RuleView() {
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [ruleName, setRuleName] = useState("Sample Rule");
  const [newName, setNewName] = useState(ruleName);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  const handleRename = () => {
    setRuleName(newName);
    setIsEditing(false);
  };

  const handleToggleEnable = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <Container pt="16">
      <Flex alignItems="center" justifyContent="space-between" mb="4">
        <Heading>{ruleName}</Heading>
        <Tag colorPalette={isEnabled ? "green" : "yellow"}>
          {isEnabled ? "Enabled" : "Disabled"}
        </Tag>
      </Flex>

      {isEditing ? (
        <HStack>
          <Input onChange={(e) => setNewName(e.target.value)} value={newName} />
          <Button onClick={handleRename}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </HStack>
      ) : (
        <HStack>
          <Button onClick={() => setIsEditing(true)}>
            <LuPenSquare /> Rename
          </Button>
          <Button
            colorPalette={isEnabled ? "yellow" : "green"}
            onClick={handleToggleEnable}
          >
            {isEnabled ? "Disable" : "Enable"}
          </Button>
          <Button>
            <LuFiles /> Duplicate
          </Button>
          <PopoverRoot>
            <PopoverTrigger>Silence</PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Button>5 minutes</Button>
                <Button>1 hour</Button>
                <Button>1 day</Button>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
          <Button colorPalette="red">
            <LuTrash /> Delete
          </Button>
        </HStack>
      )}

      <Tabs.Root mt="4">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="alert">Alert Log</Tabs.Trigger>
          <Tabs.Trigger value="query">Query Log</Tabs.Trigger>
          <Tabs.Trigger value="silence">Silence Log</Tabs.Trigger>
          <Tabs.Trigger value="yaml">YAML</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          {/* Overview content */}
          <Text>Rule configuration and conditions displayed here.</Text>
        </Tabs.Content>

        <Tabs.Content value="alert">
          {/* Alert Log */}
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Sent</Table.Cell>
                <Table.Cell>2024-01-01 12:00</Table.Cell>
                <Table.Cell>High Severity</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        <Tabs.Content value="query">
          {/* Query Log */}
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Query Start</Table.Cell>
                <Table.Cell>2024-01-01 12:00</Table.Cell>
                <Table.Cell>End</Table.Cell>
                <Table.Cell>12:05</Table.Cell>
                <Table.Cell>Hits</Table.Cell>
                <Table.Cell>120</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        <Tabs.Content value="silence">
          {/* Silence Log */}
          <Alert status="info">
            Matches are automatically silenced after alerting.
          </Alert>
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Until</Table.Cell>
                <Table.Cell>2024-01-01 14:00</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        <Tabs.Content value="yaml">
          {/* YAML */}
          <Box bg="gray.100" p="4" rounded="md">
            <pre>{`name: Sample Rule\nindex: security-events\nfilter:\n  - query_string:\n      query: "_exists_:error"\nalert: email\nemail:\n  - admin@example.com\n`}</pre>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}

export default RuleView;
