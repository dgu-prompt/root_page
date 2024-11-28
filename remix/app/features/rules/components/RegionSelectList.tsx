import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { getRegionName } from "@/services/getRegionName";
import { Flex, Stack, Text } from "@chakra-ui/react";

import { useRules } from "@features/rules/contexts/mockRuleContext";
import { useMemo } from "react";

interface RegionSelectListProps {
  regions: string[];
}

export default function RegionSelectList({ regions }: RegionSelectListProps) {
  const { region, setRegion } = useRegion();
  const { rules } = useRules();

  // 지역별 규칙 수 계산
  const regionRuleCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    regions.forEach((r) => {
      counts[r] = rules.filter((rule) => rule.region === r).length;
    });

    return counts;
  }, [rules, regions]);

  return (
    <Stack>
      {regions.map((r) => (
        <Button
          key={r}
          variant={region === r ? "subtle" : "ghost"}
          value={r}
          onClick={() => setRegion(r)}
        >
          <Flex justifyContent="space-between" width="full">
            <Text>{getRegionName(r)}</Text>
            {regionRuleCounts && (
              <Text color="fg.subtle">{regionRuleCounts[r]}</Text>
            )}
          </Flex>
        </Button>
      ))}
    </Stack>
  );
}
