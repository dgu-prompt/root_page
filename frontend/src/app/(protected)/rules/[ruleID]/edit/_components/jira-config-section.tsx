import { JiraRule } from "rule";
import { Card, Input, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import JiraAssigneeSelect from "./jira-assignee-select";

export default function JiraConfigSection() {
  const { ruleData, setRuleData } = useRuleEdit();

  const handleInputChange =
    (field: keyof JiraRule) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRuleData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Card.Title>Jira 알림 설정</Card.Title>
        <Card.Description>
          Jira에 생성할 이슈의 기본 설정을 구성하세요.
        </Card.Description>
      </Card.Header>
      <Card.Body gap="6">
        <Field
          label="알림 제목"
          helperText="빈 칸으로 둔 경우, 기본값이 사용됩니다."
        >
          <Input
            value={ruleData.alertSubject}
            onChange={handleInputChange("alertSubject")}
            placeholder="알림 제목을 입력하세요"
          />
        </Field>
        <Field
          label="알림 내용"
          helperText="빈 칸으로 둔 경우, 기본값이 사용됩니다."
        >
          <Textarea
            value={ruleData.alertText}
            onChange={handleInputChange("alertText")}
            placeholder="알림 내용을 입력하세요"
          />
        </Field>
        <Field
          label="프로젝트"
          helperText="이슈를 생성할 프로젝트 이름을 입력하세요."
        >
          <Input
            value={(ruleData as JiraRule).project}
            onChange={handleInputChange("project")}
            placeholder="프로젝트를 입력하세요"
          />
        </Field>
        <JiraAssigneeSelect />
        <Field label="우선 순위">
          <Input
            value={(ruleData as JiraRule).priority}
            onChange={handleInputChange("priority")}
            placeholder="우선 순위를 선택하세요"
          />
        </Field>
      </Card.Body>
    </Card.Root>
  );
}
