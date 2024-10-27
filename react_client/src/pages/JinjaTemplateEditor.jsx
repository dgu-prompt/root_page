import { useState } from "react";
import {
  Container,
  Textarea,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"

// 미리 정의된 필드 리스트
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

function JinjaTemplateEditor() {
  const [templateText, setTemplateText] = useState(
    "Alert triggered! *({{num_hits}} Matches!)*\nSomething happened with {{username}} ({{email}})\n{{description|truncate}}"
  );

  // 템플릿 필드 추가 함수
  const addFieldToTemplate = (field) => {
    setTemplateText((prev) => `${prev} {{${field}}}`);
  };

  const generatePreview = () => {
    let previewText = templateText;
    predefinedFields.forEach(({ name, sample }) => {
      const regex = new RegExp(`{{\\s*${name}\\s*}}`, "g");
      previewText = previewText.replace(regex, sample);
    });
    return previewText;
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Jinja 템플릿 편집
      </Text>

      <Field label="Jinja 템플릿 입력">
        <Textarea
          value={templateText}
          onChange={(e) => setTemplateText(e.target.value)}
          placeholder="템플릿을 작성하거나, 아래 버튼을 클릭하여 필드를 추가하세요"
          size="lg"
          minH="150px"
        />
      </Field>

      <Text fontSize="md" fontWeight="bold" mt={6} mb={2}>
        미리 정의된 필드 추가
      </Text>
      <Box border="1px" borderColor="gray.300" p={2} borderRadius="md">
        <Stack direction="row" flexWrap="wrap" spacing={2}>
          {predefinedFields.map((field) => (
            <Button
              key={field}
              onClick={() => addFieldToTemplate(field.name)}
              size="sm"
              variant="outline"
            >
              {field.name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box mt={6}>
        <Text fontSize="md" fontWeight="bold" mb={2}>
          미리보기
        </Text>
        <Box border="1px solid" borderColor="gray.300" p={4} borderRadius="md" bg="gray.50">
          {generatePreview()
            .split("\n")
            .map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
        </Box>
      </Box>

      <Button colorScheme="teal" mt={4} onClick={() => alert("템플릿이 저장되었습니다.")}>
        템플릿 저장
      </Button>
    </Container>
  );
}

export default JinjaTemplateEditor;