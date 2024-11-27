import { Button } from "@/components/ui/button";
import { StepsItem, StepsList, StepsRoot } from "@/components/ui/steps";
import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  GridItem,
  Group,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Separator,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import YamlPreviewStep from "@features/rule-edit/YamlPreviewStep/YamlPreviewStep";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientStatus } from "@/hooks/useClientStatus";
import fetchRuleData from "./services/fetchRuleData";
import { JiraRule, Rule } from "./services/types";
import { Field } from "@/components/ui/field";
import { ControlWithStatus } from "@features/controls/types/typesV2";
import fetchControlWithStatus from "@features/controls/services/fetchControlWithStatus";
import SeverityBadge from "@features/controls/components/severity-badge";
import { Check, CircleMinus, CirclePlus, Plus, Search, X } from "lucide-react";
import { fetchAllControlWithStatus } from "@features/controls/services/fetchAllControlWithStatus";
import { InputGroup } from "@/components/ui/input-group";
import Pagination from "@/components/pagination";
import { ControlFilterMenu } from "@features/controls/components/control-filter-menu";
import { RuleEditContext, useGetRuleEdit } from "./contexts/RuleEditContext";
import React from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const ruleId = params.ruleId!;
  const ruleData = await fetchRuleData(ruleId);

  return Response.json({ ruleData });
}

export default function RuleEdit() {
  const { ruleData: initialRuleData } = useLoaderData<typeof loader>();
  const isClient = useClientStatus();

  const [ruleData, setRuleData] = useState<Rule>(initialRuleData);
  const [currentStep, setCurrentStep] = useState(0);

  // const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 1));
  // const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  // const handleSubmit = () => {
  //   console.log("Final ruleData:", ruleData);
  // };

  // For debugging
  useEffect(() => {
    console.log("Rule data updated:", ruleData);
  }, [ruleData]);

  if (!isClient) return null;

  return (
    <RuleEditContext.Provider
      value={{
        ruleData: ruleData,
        setRuleData: setRuleData,
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
      }}
    >
      <Container pt={{ base: "8", md: "10", lg: "12" }}>
        <Heading mb="8" size="3xl">
          {ruleData.name}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <StepContent />
          </GridItem>
          <GridItem colSpan={1}>
            <StepsSidebar />
          </GridItem>
        </SimpleGrid>
      </Container>
    </RuleEditContext.Provider>
  );
}

function StepContent() {
  const { currentStep } = useGetRuleEdit();

  const steps: { [key: number]: JSX.Element } = {
    0: (
      <Stack gap="6">
        <GeneralConfigSection />
        <ControlConfigSection />
        <JiraConfigSection />
      </Stack>
    ),
    1: <YamlPreviewStep />,
  };

  return steps[currentStep] || null;
}

function GeneralConfigSection() {
  const { ruleData, setRuleData } = useGetRuleEdit();

  const handleInputChange =
    (field: keyof Rule) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setRuleData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Card.Title>일반 설정</Card.Title>
        <Card.Description>알림 규칙의 기본 설정을 구성합니다.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Flex direction="column" gap="6">
          <Field
            label="파일 이름"
            helperText="파일 이름은 고유해야 합니다."
            required
          >
            <Input
              value={ruleData.filename}
              onChange={handleInputChange("filename")}
              placeholder="파일 이름을 입력하세요"
            />
          </Field>
          <Field
            label="규칙 이름"
            helperText="규칙의 이름을 입력하세요. 지정하지 않으면 파일 이름이 사용됩니다."
          >
            <Input
              value={ruleData.name}
              onChange={handleInputChange("name")}
              placeholder="규칙 이름을 입력하세요"
            />
          </Field>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

function ControlConfigSection() {
  const { ruleData, setRuleData } = useGetRuleEdit();

  // 정보 가져오기
  const [controlWithStatusData, setControlWithStatusData] = useState<
    ControlWithStatus[]
  >([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadControlWithStatusData() {
      try {
        setLoading(true);
        const controlWithStatusData = await fetchControlWithStatus(
          ruleData.controlIds
        );
        setControlWithStatusData(controlWithStatusData);
      } catch (err) {
        console.error("Failed to load control data", err);
      } finally {
        setLoading(false);
      }
    }

    if (ruleData?.controlIds?.length > 0) {
      loadControlWithStatusData();
    }
  }, [ruleData.controlIds]);

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Flex justify="space-between" gap="4">
          <Box>
            <Card.Title>제어 설정</Card.Title>
            <Card.Description>
              규칙에 적용할 제어를 선택합니다. 현재 {ruleData.region}의 제어를
              보고 있습니다.
            </Card.Description>
          </Box>
          <AddControlDialog>
            <Button variant="outline" size="sm">
              제어 추가
            </Button>
          </AddControlDialog>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Box>
          <Separator />
          {controlWithStatusData.map((control, index) => (
            <React.Fragment key={control.controlId}>
              {index !== 0 && <Separator />}
              <Flex align="center" justify="space-between" py="4">
                <Flex
                  direction="column"
                  align="baseline"
                  gap="1"
                  justify="space-between"
                >
                  <HStack>
                    {control.controlStatus === "enabled" ? (
                      <Text fontWeight="medium">{control.controlId}</Text>
                    ) : (
                      <Text fontWeight="medium" color="fg.muted">
                        {control.controlId} (비활성화됨)
                      </Text>
                    )}
                    <SeverityBadge severity={control.severity} />
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    {control.title}
                  </Text>
                </Flex>
                <IconButton
                  onClick={() => {
                    setRuleData((prev) => ({
                      ...prev,
                      controlIds: prev.controlIds.filter(
                        (id) => id !== control.controlId
                      ),
                    }));
                  }}
                  variant="ghost"
                  size="sm"
                  colorPalette="red"
                >
                  <CircleMinus />
                </IconButton>
              </Flex>
            </React.Fragment>
          ))}
          <Separator />
          <AddControlDialog>
            <Button
              variant="ghost"
              px="0"
              width="full"
              py="7"
              justifyContent="start"
              rounded="none"
            >
              <Icon>
                <Plus />
              </Icon>
              <Text>제어 추가</Text>
            </Button>
          </AddControlDialog>
          <Separator />
        </Box>
      </Card.Body>
      <Card.Footer>
        <Card.Description>
          {controlWithStatusData.length}개의 제어
        </Card.Description>
      </Card.Footer>
    </Card.Root>
  );
}

function AddControlDialog({ children }: { children: React.ReactNode }) {
  const { ruleData, setRuleData } = useGetRuleEdit();
  const [addedControlIds, setAddedControlIds] = useState<string[]>([]);

  function handleSave() {
    setRuleData((prev) => {
      const uniqueControlIds = new Set([
        ...prev.controlIds,
        ...addedControlIds,
      ]);
      return {
        ...prev,
        controlIds: Array.from(uniqueControlIds),
      };
    });

    setAddedControlIds([]);
  }

  return (
    <DialogRoot
      size="lg"
      scrollBehavior="inside"
      lazyMount
      unmountOnExit
      onExitComplete={() => setAddedControlIds([])}
      closeOnInteractOutside={false}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>제어 추가</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ControlSelectBody
            region={ruleData.region}
            addedControlIds={addedControlIds}
            setAddedControlIds={setAddedControlIds}
          />
        </DialogBody>
        <DialogFooter>
          <Text me="4">{addedControlIds.length}개 제어 선택됨</Text>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

interface ControlSelectBodyProps {
  region: string;
  addedControlIds: string[];
  setAddedControlIds: Dispatch<SetStateAction<string[]>>;
}

function ControlSelectBody({
  region,
  addedControlIds,
  setAddedControlIds,
}: ControlSelectBodyProps) {
  const [controls, setControls] = useState<ControlWithStatus[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    controlStatus: null,
    severity: null,
  });
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadControls() {
      try {
        setLoading(true);
        const { controls, totalCounts } = await fetchAllControlWithStatus({
          region: region,
          filters: filters,
          page: page,
          pageSize: pageSize,
        });
        setControls(controls);
        setTotalCount(totalCounts);
      } catch (err) {
        console.error("Failed to load controls", err);
      } finally {
        setLoading(false);
      }
    }

    loadControls();
  }, [filters, page, region]);

  function handleCheckChange(controlId: string) {
    console.log("clicked checkchange button");

    setAddedControlIds((prev) => {
      if (prev.includes(controlId)) {
        return prev.filter((id) => id !== controlId);
      } else {
        return [...prev, controlId];
      }
    });
  }

  const handlePageChange = (details: { page: number }) => {
    setPage(details.page);
  };

  const onFilterChange = ({
    type,
    value,
  }: {
    type: string;
    value: string | null;
  }) => {
    setFilters((prev) => {
      const newValue = prev[type] === value ? null : value; // 동일한 값 클릭 시 null로 설정
      return {
        ...prev,
        [type]: newValue,
        page: 1, // 필터 변경 시 페이지 초기화
      };
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <>
      <HStack align="center">
        <InputGroup
          flex="1"
          startElement={
            <Icon>
              <Search />
            </Icon>
          }
          endElement={
            filters.searchQuery && (
              <Icon
                color="fg"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: "",
                    page: 1,
                  }))
                }
              >
                <X />
              </Icon>
            )
          }
          width="full"
        >
          <Input
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                searchQuery: e.target.value,
                page: 1,
              }))
            }
            placeholder="제어 검색"
            value={filters.searchQuery}
          />
        </InputGroup>

        <ControlFilterMenu
          filterState={filters}
          onFilterChange={({ type, value }) => onFilterChange({ type, value })}
          filterOptions={{
            controlStatus: ["enabled", "disabled"],
            severity: ["critical", "high", "medium", "low"],
          }}
          onResetFilters={handleResetFilters}
        />
      </HStack>

      {loading ? (
        <Center py="8">
          <Spinner />
        </Center>
      ) : (
        <Stack gap="4" mt="8">
          <Text>
            {region}에서 {totalCount}개의 제어 찾음
          </Text>
          <Box>
            <Separator />
            {controls.map((control, index) => {
              const isChecked = addedControlIds.includes(control.controlId);
              return (
                <React.Fragment key={control.controlId}>
                  {index !== 0 && <Separator />}
                  <Flex align="center" justify="space-between" py="4">
                    <Flex
                      direction="column"
                      align="baseline"
                      gap="1"
                      justify="space-between"
                    >
                      <HStack>
                        {control.controlStatus === "enabled" ? (
                          <Text fontWeight="medium">{control.controlId}</Text>
                        ) : (
                          <Text fontWeight="medium" color="fg.muted">
                            {control.controlId} (비활성화됨)
                          </Text>
                        )}
                        <SeverityBadge severity={control.severity} />
                      </HStack>
                      <Text fontSize="sm" color="fg.muted">
                        {control.title}
                      </Text>
                    </Flex>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      value={control.controlId}
                      onClick={() => handleCheckChange(control.controlId)}
                    >
                      {isChecked ? <Check /> : <CirclePlus />}
                    </IconButton>
                  </Flex>
                </React.Fragment>
              );
            })}
            <Separator />
            <Pagination
              totalCount={totalCount}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </Box>
        </Stack>
      )}
    </>
  );
}

function JiraConfigSection() {
  const { ruleData, setRuleData } = useGetRuleEdit();

  const handleInputChange =
    (field: keyof JiraRule) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
          Jira 이슈를 생성할 때 사용할 알림 설정을 구성합니다.
        </Card.Description>
      </Card.Header>
      <Card.Body gap="6">
        <Field label="알림 제목" required>
          <Input
            value={ruleData.alertSubject}
            onChange={handleInputChange("alertSubject")}
            placeholder="알림 제목을 입력하세요"
          />
        </Field>
        <Field label="알림 내용" required>
          <Input
            value={ruleData.alertText}
            onChange={handleInputChange("alertText")}
            placeholder="알림 내용을 입력하세요"
          />
        </Field>
        <Field label="프로젝트" required>
          <Input
            value={(ruleData as JiraRule).project}
            onChange={handleInputChange("project")}
            placeholder="프로젝트를 선택하세요"
          />
        </Field>
        <Field label="담당자" required>
          <Input
            value={(ruleData as JiraRule).assignee}
            onChange={handleInputChange("assignee")}
            placeholder="담당자를 선택하세요"
          />
        </Field>
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

function StepsSidebar() {
  const { ruleData, currentStep, setCurrentStep } = useGetRuleEdit();

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handleSubmit = () => {
    console.log("Final ruleData:", ruleData);
  };

  return (
    <Card.Root
      size={{ base: "sm", md: "md", lg: "lg" }}
      variant="elevated"
      position="sticky"
      top={20}
    >
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
            <Link to="#">취소</Link>
          </Button>

          <Group>
            <Button
              disabled={currentStep === 0}
              onClick={handlePrev}
              variant="surface"
            >
              이전
            </Button>
            {currentStep < 2 ? (
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("Form data:", formData);
}
