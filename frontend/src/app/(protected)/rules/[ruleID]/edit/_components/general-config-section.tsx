"use client";

import { Card, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useRuleEdit } from "../_contexts/rule-edit-context";

export default function GeneralConfigSection() {
  const { ruleData, setRuleData } = useRuleEdit();

  const handleInputChange =
    (field: keyof typeof ruleData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRuleData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Card.Title>일반 설정</Card.Title>
        <Card.Description>알림 규칙의 기본 정보를 설정하세요.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack direction="column" gap="6">
          <Field
            label="규칙 이름"
            helperText="규칙 이름은 규칙을 관리하고 구분하는 데 사용됩니다."
            required
          >
            <Input
              value={ruleData.name}
              onChange={handleInputChange("name")}
              placeholder="규칙 이름을 입력하세요"
            />
          </Field>
          <Field
            label="규칙 설명"
            helperText="규칙의 역할과 목적을 간단히 설명해주세요. 규칙 설명은 규칙의 기능을 명확히 이해하는 데 도움이 됩니다."
          >
            <Textarea
              value={ruleData.description}
              onChange={handleInputChange("description")}
              placeholder="규칙의 설명을 입력하세요."
            />
          </Field>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
