import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Box,
  Input,
  Separator,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { JiraRuleProps } from "@features/rule-edit/JiraRuleData"; // Adjust the import path as needed.

const predefinedFields = [
  { name: "num_hits", sample: 10 },
  { name: "username", sample: "johndoe" },
  { name: "email", sample: "johndoe@example.com" },
  { name: "description", sample: "User exceeded login attempts." },
  { name: "location", sample: "New York" },
  { name: "timestamp", sample: "2023-12-01 12:30:45" },
  { name: "event_type", sample: "LoginAttempt" },
  { name: "severity", sample: "High" },
  { name: "host", sample: "server01" },
  { name: "ip_address", sample: "192.168.1.1" },
];

const ConfigAlertJiraTitle = ({
  jiraRuleData,
  setJiraRuleData,
}: JiraRuleProps) => {
  const { alertSubject, alertText } = jiraRuleData;

  const addFieldToAlert = (field: string, type: "subject" | "text") => {
    setJiraRuleData((prev) => {
      const value = type === "subject" ? prev.alertSubject : prev.alertText;
      const newValue = `${value} {{${field}}}`;
      return type === "subject"
        ? { ...prev, alertSubject: newValue }
        : { ...prev, alertText: newValue };
    });
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setJiraRuleData((prev) => ({ ...prev, alertSubject: value }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJiraRuleData((prev) => ({ ...prev, alertText: value }));
  };

  const generatePreview = (text: string) => {
    return predefinedFields.reduce(
      (acc, { name, sample }) =>
        acc.replace(new RegExp(`{{\\s*${name}\\s*}}`, "g"), String(sample)),
      text
    );
  };

  return (
    <VStack gap="8" mt="2">
      <VStack gap="6">
        <Field label="알림 제목">
          <Input
            onChange={handleSubjectChange}
            placeholder="Alert Subject"
            value={alertSubject}
          />
        </Field>

        <Field label="미리 정의된 필드 추가">
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {predefinedFields.map((field) => (
              <Button
                key={field.name}
                onClick={() => addFieldToAlert(field.name, "subject")}
                size="sm"
                variant="outline"
              >
                {field.name}
              </Button>
            ))}
          </Stack>
        </Field>

        <Field label="알림 제목 미리보기">
          <Box
            bg="gray.50"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={2}
            width="full"
          >
            {generatePreview(alertSubject)
              .split("\n")
              .map((line, index) => (
                <Text key={index}>{line}</Text>
              ))}
          </Box>
        </Field>
      </VStack>

      <Separator />

      <Field label="알림 본문">
        <Textarea
          onChange={handleTextChange}
          placeholder="Alert Text"
          value={alertText}
        />
      </Field>

      <Field label="미리 정의된 필드 추가">
        <Stack direction="row" flexWrap="wrap" gap={2} mt={2}>
          {predefinedFields.map((field) => (
            <Button
              key={field.name}
              onClick={() => addFieldToAlert(field.name, "text")}
              size="sm"
              variant="outline"
            >
              {field.name}
            </Button>
          ))}
        </Stack>
      </Field>

      <Field label="알림 본문 미리보기">
        <Box
          bg="gray.50"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p={2}
          width="full"
        >
          {generatePreview(alertText)
            .split("\n")
            .map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
        </Box>
      </Field>
    </VStack>
  );
};

export default ConfigAlertJiraTitle;
