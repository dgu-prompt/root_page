import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatUpTrend,
  StatValueText,
  StatValueUnit,
} from "@/components/ui/stat";
import {
  AspectRatio,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";

import RegionSelect from "@/components/RegionSelect";

import SeverityBadge from "@features/controls/components/severity-badge";
import {
  Calendar,
  Check,
  ExternalLink,
  Pencil,
  Plus,
  TriangleAlert,
} from "lucide-react";

import SecurityScoreCard from "@features/dashboard/components/SecurityScoreCard";
import StackedBarChart from "./components/StackedBarChart";
import JiraPriorityIndicator from "./components/JiraPriorityIndicator";
import PriorityBarChart from "./components/PriorityBarChart";
import TaskPieChart from "./components/TaskPieChart";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";

export default function Index() {
  return (
    <Container pt={{ base: "8", md: "10", lg: "12" }}>
      <Heading mb="8" size="3xl">
        대시보드
      </Heading>

      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }} variant="elevated">
        <Card.Body>
          <Flex
            align={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap="4"
            justifyContent="space-between"
          >
            <Stack>
              <Card.Title fontSize={{ base: "lg", md: "xl" }}>
                보안 개요
              </Card.Title>
              <Card.Description>
                <Link to="https://console.aws.amazon.com/securityhub/">
                  <ChakraLink>
                    <Text>AWS Security Hub</Text>
                    <Icon>
                      <ExternalLink />
                    </Icon>
                  </ChakraLink>
                </Link>
                <Text as="span">를 기반으로 한 보안 상태 요약 정보입니다.</Text>
              </Card.Description>
            </Stack>
            <Box width={{ base: "full", md: "md" }}>
              <Field label="리전 선택">
                <RegionSelect />
              </Field>
            </Box>
          </Flex>
        </Card.Body>
      </Card.Root>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mb="10" mt="3">
        <SecurityScoreCard />
        <DashboardCard
          title="제어 상태"
          description="Security Hub는 지난 24시간 동안의 제어 조사 결과를 바탕으로 제어 상태를 결정합니다. 각 상태는 규정 준수 여부를 통해 제어의 성능을 요약합니다."
        >
          {/* <Skeleton> */}
          <StackedBarChart />
          {/* </Skeleton> */}
        </DashboardCard>
        <DashboardCard
          title="실패한 검사"
          description="실패한 검사는 보안 검사의 결과로, Security Hub가 규정 준수 실패로 식별한 항목의 개수를 나타냅니다. 이는 AWS 환경에서 잠재적 취약성을 파악하는 데 사용됩니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">
              194 <StatValueUnit>/ 512</StatValueUnit>
            </StatValueText>
          </StatRoot>
        </DashboardCard>
        <DashboardCard
          title="심각도별 실패한 검사"
          description="심각도는 위협 행위자의 악용 가능성과 사용자의 AWS 환경에 미치는 영향을 바탕으로 Security Hub가 할당한 중요도입니다."
        >
          <DataListRoot
            orientation="horizontal"
            size={{ base: "md", md: "lg" }}
          >
            <DataListItem
              grow
              key="Critical"
              label={<SeverityBadge severity="critical" />}
              value={16}
            />
            <DataListItem
              grow
              key="High"
              label={<SeverityBadge severity="high" />}
              value={26}
            />
            <DataListItem
              grow
              key="Medium"
              label={<SeverityBadge severity="medium" />}
              value={109}
            />
            <DataListItem
              grow
              key="Low"
              label={<SeverityBadge severity="low" />}
              value={43}
            />
          </DataListRoot>
        </DashboardCard>
      </SimpleGrid>

      <Card.Root size="lg" variant="elevated">
        <Card.Body>
          <Card.Title>보안 이슈 해결 현황</Card.Title>
          <Card.Description mt="1">
            <Link to="https://www.atlassian.com/software/jira">
              <ChakraLink>
                <Text>Jira</Text>
                <Icon>
                  <ExternalLink />
                </Icon>
              </ChakraLink>
            </Link>
            <Text as="span">에서 보안 이슈를 추적하고 관리합니다.</Text>
          </Card.Description>
        </Card.Body>
      </Card.Root>

      <SimpleGrid columns={{ base: 1, lg: 2, xl: 4 }} gap="3" mt="3">
        {/* <DashboardCard
          title="미해결 티켓"
          description="현재 시스템에 남아 있는 미해결 티켓의 수를 보여줍니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">
              70 <StatValueUnit>/ 120</StatValueUnit>
            </StatValueText>
          </StatRoot>
        </DashboardCard> */}

        <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
          <Card.Body>
            <HStack gap="4">
              <Box rounded="full" bg="bg.emphasized" p="2">
                <Icon size="lg">
                  <Check />
                </Icon>
              </Box>
              <StatRoot>
                <StatLabel>최근 7일 이내에</StatLabel>
                <StatValueText>10개 완료</StatValueText>
              </StatRoot>
            </HStack>
          </Card.Body>
        </Card.Root>

        <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
          <Card.Body>
            <HStack gap="4">
              <Box rounded="full" bg="bg.emphasized" p="2">
                <Icon size="lg">
                  <Pencil />
                </Icon>
              </Box>
              <StatRoot>
                <StatLabel>최근 7일 이내에</StatLabel>
                <StatValueText>3개 업데이트</StatValueText>
              </StatRoot>
            </HStack>
          </Card.Body>
        </Card.Root>

        <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
          <Card.Body>
            <HStack gap="4">
              <Box rounded="full" bg="bg.emphasized" p="2">
                <Icon size="lg">
                  <Plus />
                </Icon>
              </Box>
              <StatRoot>
                <StatLabel>최근 7일 이내에</StatLabel>
                <StatValueText>3개 생성</StatValueText>
              </StatRoot>
            </HStack>
          </Card.Body>
        </Card.Root>

        <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
          <Card.Body>
            <HStack gap="4">
              <Box rounded="full" bg="bg.emphasized" p="2">
                <Icon size="lg">
                  <Calendar />
                </Icon>
              </Box>
              <StatRoot>
                <StatLabel>다음 7일</StatLabel>
                <StatValueText>0개 기한 초과</StatValueText>
              </StatRoot>
            </HStack>
          </Card.Body>
        </Card.Root>

        {/* <DashboardCard
          title="주간 작업 완료 비율 변화"
          description="지난 주와 비교한 팀의 작업 완료 비율 변화입니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <HStack>
              <StatValueText>60%</StatValueText>
              <StatUpTrend>12%</StatUpTrend>
            </HStack>
            <StatHelpText>지난 주 대비</StatHelpText>
          </StatRoot>
        </DashboardCard> */}

        <GridItem colSpan={{ xl: 2 }}>
          <DashboardCard
            title="상태별 티켓"
            description="티켓 상태에 따른 개수를 나타냅니다."
          >
            <TaskPieChart />
          </DashboardCard>
        </GridItem>

        <GridItem colSpan={{ xl: 2 }}>
          <DashboardCard
            title="우선순위별 미해결 티켓"
            description="우선순위에 따른 미해결 티켓 수를 나타냅니다."
          >
            <PriorityBarChart />
          </DashboardCard>
        </GridItem>

        <GridItem colSpan={{ xl: 2 }}>
          <DashboardCard
            title="담당자별 미해결 티켓"
            description="미해결 티켓을 담당자별로 분류하여 표시합니다."
          >
            <DataListRoot
              orientation="horizontal"
              size={{ base: "md", md: "lg" }}
            >
              <DataListItem
                grow
                key="Critical"
                label={
                  <HStack gap="4">
                    <Avatar name="김경필" size="sm" />
                    <Text>김경필</Text>
                  </HStack>
                }
                value={8}
              />
              <DataListItem
                grow
                key="High"
                label={
                  <HStack gap="4">
                    <Avatar name="김규리" size="sm" />
                    <Text>김규리</Text>
                  </HStack>
                }
                value={7}
              />
              <DataListItem
                grow
                key="Medium"
                label={
                  <HStack gap="4">
                    <Avatar name="이선경" size="sm" />
                    <Text>이선경</Text>
                  </HStack>
                }
                value={5}
              />
              <DataListItem
                grow
                key="Low"
                label={
                  <HStack gap="4">
                    <Avatar name="정대용" size="sm" />
                    <Text>정대용</Text>
                  </HStack>
                }
                value={2}
              />
            </DataListRoot>
          </DashboardCard>
        </GridItem>

        <GridItem colSpan={{ xl: 2 }}>
          <DashboardCard
            title="우선순위 작업"
            description="즉각 처리가 필요한 매우 중요/높음 티켓 또는 마감일이 임박한 티켓을 표시합니다."
          >
            <Stack gap="4">
              <Stack gap="1">
                <Text>EC2.17 - EC2 instances should not use multiple ENIs</Text>
                <HStack fontSize="sm">
                  <Text>VT-120</Text>
                  <Text>김경필</Text>
                </HStack>
              </Stack>
              <Stack gap="1">
                <Text>IAM.4 - IAM root user access key should not exist</Text>
                <HStack fontSize="sm">
                  <Text>VT-205</Text>
                  <Text>정대용</Text>
                </HStack>
              </Stack>
              <Stack gap="1">
                <Text>
                  RDS.14 - Amazon Aurora clusters should have backtracking
                  enabled
                </Text>
                <HStack fontSize="sm">
                  <Text>VT-302</Text>
                  <Text>이선경</Text>
                </HStack>
              </Stack>
            </Stack>
          </DashboardCard>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}

function DashboardCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Card.Root height="full" size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header flex="1">
        <Card.Title fontSize={{ base: "md", md: "lg" }}>{title}</Card.Title>
        <Card.Description width={{ base: "full", md: "90%" }}>
          {description}
        </Card.Description>
      </Card.Header>
      <Card.Body flex="0">{children}</Card.Body>
    </Card.Root>
  );
}

function WarningCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Card.Root
      height="full"
      size={{ base: "sm", md: "md", lg: "lg" }}
      bg="bg.warning"
      color="fg.warning"
    >
      <Card.Header flex="1">
        <Card.Title fontSize={{ base: "md", md: "lg" }}>
          <Icon me="2">
            <TriangleAlert />
          </Icon>
          {title}
        </Card.Title>
        <Card.Description
          width={{ base: "full", md: "90%" }}
          color="border.warning"
        >
          {description}
        </Card.Description>
      </Card.Header>
      <Card.Body flex="0">{children}</Card.Body>
    </Card.Root>
  );
}
