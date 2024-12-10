import type { RegionalRuleSummary } from "rule";
import { Card } from "@chakra-ui/react";
import RegionSelectList from "./region-select-list";

export default function RegionSelectSidebar({
  regionalRuleSummaries,
}: {
  regionalRuleSummaries: RegionalRuleSummary[];
}) {
  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }} variant="elevated">
      <Card.Body gap="4">
        <Card.Title>AWS 리전 선택</Card.Title>
        <RegionSelectList regionalRuleSummaries={regionalRuleSummaries} />
      </Card.Body>
    </Card.Root>
  );
}
