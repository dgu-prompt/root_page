import { Card, Stack, VStack } from "@chakra-ui/react";
import AlertConfiguration from "./config/alert/configalert";
import SlackSettings from "./config/alert/configalertslack";
import ConfigGeneral from "./config/alert/ConfigGeneral";
import ConfigFilter from "./config/alert/ConfigFilter";

type YamlPreviewProps = {
  content: string;
};

const RuleForm = ({ content }: YamlPreviewProps) => {
  return (
    <Stack gap="8">
      <Card.Root
        size={{
          base: "sm",
          md: "md",
          lg: "lg",
        }}
      >
        <Card.Header>
          <Card.Title>General</Card.Title>
        </Card.Header>
        <Card.Body>
          <ConfigGeneral />
        </Card.Body>
      </Card.Root>

      <ConfigFilter />

      <Card.Root
        size={{
          base: "sm",
          md: "md",
          lg: "lg",
        }}
      >
        <Card.Header>
          <Card.Title>Alert</Card.Title>
        </Card.Header>
        <Card.Body>
          <AlertConfiguration />
        </Card.Body>
      </Card.Root>

      <Card.Root
        size={{
          base: "sm",
          md: "md",
          lg: "lg",
        }}
      >
        <Card.Header>
          <Card.Title>Slack</Card.Title>
        </Card.Header>
        <Card.Body>
          <SlackSettings />
        </Card.Body>
      </Card.Root>

      <Card.Root
        size={{
          base: "sm",
          md: "md",
          lg: "lg",
        }}
      >
        <Card.Header>
          <Card.Title>Jira</Card.Title>
        </Card.Header>
        <Card.Body>
          <SlackSettings />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};

export default RuleForm;
