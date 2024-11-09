// AlertField.tsx
import { Box, Stack, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";

// 미리 정의된 필드 목록
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

// Props 타입 정의
interface AlertFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const AlertField: React.FC<AlertFieldProps> = ({ label, value, setValue }) => {
  const [focusedField, setFocusedField] = useState<"text" | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const addFieldToTemplate = (field: string) => {
    const ref = textRef.current;

    if (ref) {
      const { selectionStart, selectionEnd } = ref;
      const newValue = `${value.slice(0, selectionStart)}{{${field}}}${value.slice(selectionEnd)}`;
      setValue(newValue);
      setTimeout(() => {
        ref.selectionStart = ref.selectionEnd =
          selectionStart + `{{${field}}}`.length;
        ref.focus();
      });
    }
  };

  const generatePreview = (text: string) => {
    return predefinedFields.reduce(
      (acc, { name, sample }) =>
        acc.replace(new RegExp(`{{\\s*${name}\\s*}}`, "g"), sample),
      text
    );
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      mb={4}
      p={4}
    >
      <VStack gap={4} mt={2}>
        <Text fontWeight="bold">{label}</Text>
        <Textarea
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocusedField("text")}
          placeholder="Alert Text"
          ref={textRef}
          value={value}
        />
        {focusedField === "text" && (
          <TemplateFields onFieldSelect={addFieldToTemplate} />
        )}
        <Preview content={generatePreview(value)} />
      </VStack>
    </Box>
  );
};

// 미리 정의된 필드를 선택하는 버튼 목록
const TemplateFields = ({ onFieldSelect }) => (
  <Box mt={2}>
    <Text fontSize="sm" fontWeight="bold">
      미리 정의된 필드 추가
    </Text>
    <Stack direction="row" flexWrap="wrap" gap={2} mt={2}>
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

export default AlertField;
