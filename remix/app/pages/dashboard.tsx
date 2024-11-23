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
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import RegionSelect from "@/components/RegionSelect";

import SeverityBadge from "@features/controls/components/severity-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TriangleAlert } from "lucide-react";

export default function Index() {
  const { t } = useTranslation();

  return (
    <Container pt={{ base: "6", md: "8", lg: "10" }}>
      <Heading mb="8" size="2xl">
        {t("dashboardTitle")}
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
                AWS Security Hub를 기반으로 한 보안 상태 요약 정보입니다.
              </Card.Description>
            </Stack>
            <Box width={{ base: "full", md: "md" }}>
              <RegionSelect
                selectedRegion={"ap-northeast-2"}
                onRegionChange={() => {}}
              />
            </Box>
          </Flex>
        </Card.Body>
      </Card.Root>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mb="10" mt="3">
        <DashboardCard
          title="보안 점수"
          description="현재 보안 점수는 활성화된 제어 중 통과된 항목의 비율로 계산됩니다. 평가 대상이 아닌 항목은 점수 계산에서 제외됩니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatLabel>AWS에서 평가한</StatLabel>
            <StatValueText>77%</StatValueText>
            <StatHelpText>198 / 258 제어 통과</StatHelpText>
          </StatRoot>
        </DashboardCard>
        <DashboardCard
          title="제어 상태"
          description="Security Hub는 지난 24시간 동안의 제어 조사 결과를 바탕으로 제어 상태를 결정합니다. 각 상태는 규정 준수 여부를 통해 제어의 성능을 요약합니다."
        >
          <Skeleton>
            <Box height="100px" width="full"></Box>
          </Skeleton>
        </DashboardCard>
        <DashboardCard
          title="실패한 검사"
          description="실패한 검사는 보안 검사의 결과로, Security Hub가 규정 준수 실패로 식별한 항목의 개수를 나타냅니다. 이는 AWS 환경에서 잠재적 취약성을 파악하는 데 사용됩니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">
              185 <StatValueUnit>/ 505</StatValueUnit>
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
              label={<SeverityBadge severity="CRITICAL" />}
              value={123}
            />
            <DataListItem
              grow
              key="High"
              label={<SeverityBadge severity="HIGH" />}
              value={155}
            />
            <DataListItem
              grow
              key="Medium"
              label={<SeverityBadge severity="MEDIUM" />}
              value={583}
            />
            <DataListItem
              grow
              key="Low"
              label={<SeverityBadge severity="LOW" />}
              value={83}
            />
          </DataListRoot>
        </DashboardCard>
      </SimpleGrid>

      <Card.Root size="lg" variant="elevated">
        <Card.Body>
          <Card.Title>
            <Link href="#">보안 이슈 해결 현황</Link>
          </Card.Title>
          <Card.Description mt="1">
            Jira에서 보안 이슈를 추적하고 관리합니다.
          </Card.Description>
        </Card.Body>
      </Card.Root>

      <Grid
        gap="3"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        mt="3"
      >
        <WarningCard
          title="담당자가 없는 제어"
          description="현제 담당자가 없는 제어가 있습니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText>5</StatValueText>
          </StatRoot>
        </WarningCard>

        <DashboardCard
          title="미해결 티켓"
          description="현재 시스템에 남아 있는 미해결 티켓의 수를 보여줍니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">
              70 <StatValueUnit>/ 120</StatValueUnit>
            </StatValueText>
          </StatRoot>
        </DashboardCard>

        <DashboardCard
          title="상태별 티켓"
          description="티켓 상태에 따른 개수를 나타냅니다."
        >
          <DataListRoot
            orientation="horizontal"
            size={{ base: "md", md: "lg" }}
          >
            <DataListItem grow key="Open Issues" label="열린 티켓" value={40} />

            <DataListItem
              grow
              key="In Progress Issues"
              label="진행 중 티켓"
              value={30}
            />
            <DataListItem
              grow
              key="Total Issues"
              label="전체 티켓"
              value={120}
            />
          </DataListRoot>
        </DashboardCard>

        <DashboardCard
          title="새로운 티켓"
          description="최근 7일 동안 새로 생성된 티켓의 수입니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">10</StatValueText>
          </StatRoot>
        </DashboardCard>

        <DashboardCard
          title="심각도별 열린 상태 티켓"
          description="심각도에 따른 열린 상태 티켓 수를 나타냅니다."
        >
          <DataListRoot
            orientation="horizontal"
            size={{ base: "md", md: "lg" }}
          >
            <DataListItem
              grow
              key="Critical"
              label={<SeverityBadge severity="CRITICAL" />}
              value={10}
            />
            <DataListItem
              grow
              key="High"
              label={<SeverityBadge severity="HIGH" />}
              value={15}
            />
            <DataListItem
              grow
              key="Medium"
              label={<SeverityBadge severity="MEDIUM" />}
              value={10}
            />
            <DataListItem
              grow
              key="Low"
              label={<SeverityBadge severity="LOW" />}
              value={5}
            />
          </DataListRoot>
        </DashboardCard>

        <DashboardCard
          title="심각도별 진행 중 상태 티켓"
          description="심각도에 따른 진행 중 상태 티켓 수를 나타냅니다."
        >
          <DataListRoot
            orientation="horizontal"
            size={{ base: "md", md: "lg" }}
          >
            <DataListItem
              grow
              key="Critical"
              label={<SeverityBadge severity="CRITICAL" />}
              value={5}
            />
            <DataListItem
              grow
              key="High"
              label={<SeverityBadge severity="HIGH" />}
              value={10}
            />
            <DataListItem
              grow
              key="Medium"
              label={<SeverityBadge severity="MEDIUM" />}
              value={10}
            />
            <DataListItem
              grow
              key="Low"
              label={<SeverityBadge severity="LOW" />}
              value={5}
            />
          </DataListRoot>
        </DashboardCard>

        <DashboardCard
          title="담당자별 진행 중 상태 티켓"
          description="진행 중 상태 티켓을 담당자별로 분류하여 표시합니다."
        >
          <DataListRoot
            orientation="horizontal"
            size={{ base: "md", md: "lg" }}
          >
            <DataListItem grow key="Critical" label={"김경필"} value={8} />
            <DataListItem grow key="High" label={"김규리"} value={7} />
            <DataListItem grow key="Medium" label={"이선경"} value={5} />
            <DataListItem grow key="Low" label={"정대용"} value={2} />
          </DataListRoot>
        </DashboardCard>

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
                RDS.14 - Amazon Aurora clusters should have backtracking enabled
              </Text>
              <HStack fontSize="sm">
                <Text>VT-302</Text>
                <Text>이선경</Text>
              </HStack>
            </Stack>
          </Stack>
        </DashboardCard>

        <DashboardCard
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
        </DashboardCard>
      </Grid>
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
