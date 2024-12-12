import Link from "next/link";
import { Calendar, Check, ExternalLink, Pencil, Plus } from "lucide-react";
import {
  Box,
  Card,
  GridItem,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";

// import RegionSelect from "@/components/RegionSelect";

import SectionHeader from "./section-header";
import WidgetLg from "./widget-lg";
import UnresolvedTicketsByAssigneeWidget from "./unresolved-tickets-by-assignee-widget";
import PriorityBarChart from "./unresolved-tickets-by-priority-chart";
import UnresolvedTicketsByPriorityWidget from "./unresolved-tickets-by-priority-widget";
import TicketStatusWidget from "./ticket-status-widget";

export default function SecurityIssueSection() {
  return (
    <>
      <SectionHeader
        title="보안 이슈"
        description={
          <>
            <ChakraLink asChild>
              <Link href="https://www.atlassian.com/software/jira">
                Jira
                <Icon>
                  <ExternalLink />
                </Icon>
              </Link>
            </ChakraLink>
            에서 보안 이슈를 추적하고 관리합니다.
          </>
        }
      />

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
          <TicketStatusWidget />
        </GridItem>

        <GridItem colSpan={{ xl: 2 }}>
          <UnresolvedTicketsByPriorityWidget />
        </GridItem>

        <GridItem colSpan={{ xl: 2 }}>
          <UnresolvedTicketsByAssigneeWidget />
        </GridItem>

        {/* <GridItem colSpan={{ xl: 2 }}>
          <WidgetLg
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
          </WidgetLg>
        </GridItem> */}
      </SimpleGrid>
    </>
  );
}
