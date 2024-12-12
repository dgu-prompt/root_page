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
import FailedChecksWidget from "./failed-checks-widget";
import FailedChecksBySeverityWidget from "./failed-checks-by-severity-widget";
import ControlTypeWidget from "./control-type-widget";

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
        <FailedChecksWidget />
        <FailedChecksBySeverityWidget />
        <ControlTypeWidget />
      </SimpleGrid>
    </>
  );
}
