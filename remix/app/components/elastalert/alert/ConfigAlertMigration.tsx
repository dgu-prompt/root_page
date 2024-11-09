import {
  Box,
  Container,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";

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

const AlertForm = ({ alertData, setAlertData }) => {
  const [alertSubject, setAlertSubject] = useState(
    "Alert Subject: {{username}} ({{email}})"
  );
  const [alertText, setAlertText] = useState(
    "Alert triggered! *({{num_hits}} Matches!)*\nSomething happened with {{username}} ({{email}})\n{{description|truncate}}"
  );
  const [focusedField, setFocusedField] = useState<"subject" | "text" | null>(
    null
  );

  const subjectRef = useRef(null);
  const textRef = useRef(null);

  // 선택된 필드에 템플릿 필드 추가
  const addFieldToTemplate = (field) => {
    const setField =
      focusedField === "subject" ? setAlertSubject : setAlertText;
    const ref = focusedField === "subject" ? subjectRef : textRef;

    if (ref.current) {
      const element = ref.current;
      const { selectionStart, selectionEnd } = element;
      const newValue = `${alertText.slice(0, selectionStart)}{{${field}}}${alertText.slice(selectionEnd)}`;
      setField(newValue);
      setTimeout(() => {
        element.selectionStart = element.selectionEnd =
          selectionStart + `{{${field}}}`.length;
        element.focus();
      });
    }
  };

  // 필드명과 미리보기 내용 생성
  const generatePreview = (text) => {
    return predefinedFields.reduce(
      (acc, { name, sample }) =>
        acc.replace(new RegExp(`{{\\s*${name}\\s*}}`, "g"), sample),
      text
    );
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        알림 설정
      </Text>
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mb={4}
        p={4}
      >
        <VStack mt={2} spacing={4}>
          {/* 알림 텍스트 필드 */}
          <Field label="알림 텍스트">
            <Textarea
              onChange={(e) => setAlertText(e.target.value)}
              onFocus={() => setFocusedField("text")}
              placeholder="Alert Text"
              ref={textRef}
              value={alertText}
            />
            {focusedField === "text" && (
              <TemplateFields onFieldSelect={addFieldToTemplate} />
            )}
            <Preview content={generatePreview(alertText)} />
          </Field>
        </VStack>
      </Box>
    </Container>
  );
};

// 미리 정의된 필드를 선택하는 버튼 목록
const TemplateFields = ({ onFieldSelect }) => (
  <Box mt={2}>
    <Text fontSize="sm" fontWeight="bold">
      미리 정의된 필드 추가
    </Text>
    <Stack direction="row" flexWrap="wrap" mt={2} spacing={2}>
      {predefinedFields.map((field) => (
        <Button
          key={field.name}
          onClick={() => onFieldSelect(field.name)}
          size="sm"
          variant="outline"
        >
          {field.name}
        </Button>
      ))}
    </Stack>
  </Box>
);

// 미리보기 컴포넌트
const Preview = ({ content }) => (
  <Box mt={4}>
    <Text fontSize="sm" fontWeight="bold">
      미리보기
    </Text>
    <Box
      bg="gray.50"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={2}
    >
      {content.split("\n").map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </Box>
  </Box>
);

export default AlertForm;
