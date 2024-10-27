import { useState, useEffect, useRef } from "react";
import {
  Container,
  Textarea,
  VStack,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

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

function AlertForm({ alertData, setAlertData }) {
  const [alertSubject, setAlertSubject] = useState(
    "Alert Subject: {{username}} ({{email}})"
  );
  const [alertText, setAlertText] = useState(
    "Alert triggered! *({{num_hits}} Matches!)*\nSomething happened with {{username}} ({{email}})\n{{description|truncate}}"
  );

  const [focusedField, setFocusedField] = useState(null);
  const subjectRef = useRef(null);
  const textRef = useRef(null);

  // 템플릿 필드 추가 함수
  const addFieldToTemplate = (field) => {
    const insertAtCursor = (value, setValue, ref) => {
      const element = ref.current;
      const start = element.selectionStart;
      const end = element.selectionEnd;
      const updatedValue =
        value.slice(0, start) + `{{${field}}}` + value.slice(end);
      setValue(updatedValue);
      setTimeout(() => {
        element.selectionStart = element.selectionEnd =
          start + `{{${field}}}`.length;
        element.focus();
      }, 0);
    };

    if (focusedField === "subject") {
      insertAtCursor(alertSubject, setAlertSubject, subjectRef);
    } else if (focusedField === "text") {
      insertAtCursor(alertText, setAlertText, textRef);
    }
  };

  // 샘플 데이터를 활용한 미리보기 생성
  const generatePreview = (text) => {
    let previewText = text;
    predefinedFields.forEach(({ name, sample }) => {
      const regex = new RegExp(`{{\\s*${name}\\s*}}`, "g");
      previewText = previewText.replace(regex, sample);
    });
    return previewText;
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        알림 설정
      </Text>

      <Box
        border="1px solid"
        borderColor="gray.200"
        p={4}
        borderRadius="md"
        mb={4}
      >
        <VStack spacing={4} mt={2}>
          <Field label="알림 제목">
            <Textarea
              ref={subjectRef}
              placeholder="Alert Subject"
              value={alertSubject}
              onChange={(e) => setAlertSubject(e.target.value)}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
            />
            {focusedField === "subject" && (
              <Box mt={2}>
                <Text fontSize="sm" fontWeight="bold">
                  미리 정의된 필드 추가
                </Text>
                <Stack direction="row" flexWrap="wrap" spacing={2} mt={2}>
                  {predefinedFields.map((field) => (
                    <Button
                      key={field.name}
                      onClick={() => addFieldToTemplate(field.name)}
                      onMouseDown={(e) => e.preventDefault()}
                      size="sm"
                      variant="outline"
                    >
                      {field.name}
                    </Button>
                  ))}
                </Stack>
                <Box mt={4}>
                  <Text fontSize="sm" fontWeight="bold">
                    미리보기
                  </Text>
                  <Box
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                    borderRadius="md"
                    bg="gray.50"
                  >
                    <Text>{generatePreview(alertSubject)}</Text>
                  </Box>
                </Box>
              </Box>
            )}
          </Field>

          <Field label="알림 텍스트">
            <Textarea
              ref={textRef}
              placeholder="Alert Text"
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              onFocus={() => setFocusedField("text")}
              onBlur={() => setFocusedField(null)}
            />
            {focusedField === "text" && (
              <Box mt={2}>
                <Text fontSize="sm" fontWeight="bold">
                  미리 정의된 필드 추가
                </Text>
                <Stack direction="row" flexWrap="wrap" spacing={2} mt={2}>
                  {predefinedFields.map((field) => (
                    <Button
                      key={field.name}
                      onClick={() => addFieldToTemplate(field.name)}
                      onMouseDown={(e) => e.preventDefault()}
                      size="sm"
                      variant="outline"
                    >
                      {field.name}
                    </Button>
                  ))}
                </Stack>
                <Box mt={4}>
                  <Text fontSize="sm" fontWeight="bold">
                    미리보기
                  </Text>
                  <Box
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                    borderRadius="md"
                    bg="gray.50"
                  >
                    {generatePreview(alertText)
                      .split("\n")
                      .map((line, index) => (
                        <Text key={index}>{line}</Text>
                      ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Field>
        </VStack>

        <Button
          colorScheme="teal"
          mt={4}
          onClick={() => alert("알림 설정이 저장되었습니다.")}
        >
          설정 저장
        </Button>
      </Box>
    </Container>
  );
}

export default AlertForm;
