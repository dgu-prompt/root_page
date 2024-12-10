import NextLink from "next/link";
import { ExternalLink } from "lucide-react";
import { Icon, Link, SimpleGrid } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { StatRoot, StatValueText, StatValueUnit } from "@/components/ui/stat";

// import RegionSelect from "@/components/RegionSelect";

import SeverityBadge from "../../_components/severity-badge";
import SectionHeader from "./section-header";
import WidgetLg from "./widget-lg";
import ControlStatusWidget from "./control-status-widget";
import SecurityScoreWidget from "./security-score-widget";

export default function SecurityOverviewSection() {
  return (
    <>
      <SectionHeader
        title="보안 개요"
        description={
          <>
            <Link
              as={NextLink}
              href="https://console.aws.amazon.com/securityhub/"
            >
              AWS Security Hub
              <Icon>
                <ExternalLink />
              </Icon>
            </Link>
            를 기반으로 한 보안 상태 요약 정보입니다.
          </>
        }
      >
        {/* <Box width={{ base: "full", md: "md" }}>
          <Field label="리전 선택"><RegionSelect /></Field>
        </Box> */}
      </SectionHeader>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mb="10" mt="3">
        <SecurityScoreWidget />
        <ControlStatusWidget />
        <WidgetLg
          title="실패한 검사"
          description="실패한 검사는 보안 검사의 결과로, Security Hub가 규정 준수 실패로 식별한 항목의 개수를 나타냅니다. 이는 AWS 환경에서 잠재적 취약성을 파악하는 데 사용됩니다."
        >
          <StatRoot size={{ base: "md", md: "lg" }}>
            <StatValueText alignItems="baseline">
              194 <StatValueUnit>/ 512</StatValueUnit>
            </StatValueText>
          </StatRoot>
        </WidgetLg>
        <WidgetLg
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
        </WidgetLg>
      </SimpleGrid>
    </>
  );
}
