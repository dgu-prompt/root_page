import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Flex, Group } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { StepsItem, StepsList, StepsRoot } from "@/components/ui/steps";
import { toaster } from "@/components/ui/toaster";
import { useRuleEdit } from "../_contexts/rule-edit-context";

export default function StepsSidebar() {
  const { ruleData, currentStep, setCurrentStep } = useRuleEdit();
  const router = useRouter();

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handleSubmit = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/final_submit_yaml`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ruleData),
      }
    );
    if (!data.ok) {
      toaster.create({
        description: `규칙 업데이트에 실패했습니다: ${ruleData.name}`,
        type: "error",
      });
      return;
    }

    router.push("/rules");
    toaster.create({
      description: `규칙이 업데이트되었습니다: ${ruleData.name}`,
      type: "info",
    });
  };

  return (
    <Card.Root
      size={{ base: "sm", md: "md", lg: "lg" }}
      variant="elevated"
      position="sticky"
      top={20}
    >
      <Card.Header>
        <Card.Title>알림 규칙 편집</Card.Title>
      </Card.Header>
      <Card.Body>
        <StepsRoot
          count={2}
          step={currentStep}
          orientation="vertical"
          height="160px"
        >
          <StepsList>
            <StepsItem
              index={0}
              title="제어 항목 선택"
              description="알림 규칙에 포함할 보안 제어 항목을 선택하세요."
            />
            <StepsItem
              index={1}
              title="YAML 미리보기"
              description="최종 제출 전 YAML 형식의 알림 규칙을 미리보기합니다."
            />
          </StepsList>
        </StepsRoot>
      </Card.Body>
      <Card.Footer mt="4">
        <Flex justify="space-between" width="full">
          <Button asChild variant="surface">
            <Link href="/rules">취소</Link>
          </Button>

          <Group>
            <Button
              disabled={currentStep === 0}
              onClick={handlePrev}
              variant="surface"
            >
              이전
            </Button>
            {currentStep < 1 ? (
              <Button onClick={handleNext}>다음</Button>
            ) : (
              <Button onClick={handleSubmit}>제출</Button>
            )}
          </Group>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
