"use client";

import { Flex, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useRegion } from "../../_contexts/region-context";
import { RegionalRuleSummary } from "rule";

export default function RegionSelectList({
  regionalRuleSummaries,
}: {
  regionalRuleSummaries: RegionalRuleSummary[];
}) {
  const { regions, currentRegion, setCurrentRegion } = useRegion();

  const getRegionRuleCount = (region: string): number => {
    const summary = regionalRuleSummaries.find(
      (summary) => summary.region === region
    );
    return summary ? summary.count : 0;
  };

  const sortedRegions = [...regions].sort(
    (a, b) => getRegionRuleCount(b) - getRegionRuleCount(a)
  );

  return (
    <Stack>
      {sortedRegions.map((region) => (
        <Button
          key={region}
          variant={region === currentRegion ? "subtle" : "ghost"}
          value={region}
          onClick={() => setCurrentRegion(region)}
        >
          <Flex justifyContent="space-between" width="full">
            <Text>{region}</Text>
            <Text color="fg.subtle">{getRegionRuleCount(region)}</Text>
          </Flex>
        </Button>
      ))}
    </Stack>
  );
}
