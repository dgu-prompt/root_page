import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { getRegionName } from "@/services/getRegionName";
import { Flex, Stack, Text } from "@chakra-ui/react";

import { fetchRegionRuleCount } from "@features/rules/services/fetchRegionRuleCount";
import { useEffect, useState } from "react";

interface RegionSelectListProps {
  regions: string[];
}

export default function RegionSelectList({ regions }: RegionSelectListProps) {
  const { region, setRegion } = useRegion();

  const [regionRuleCounts, setRegionRuleCounts] = useState<
    Record<string, number>
  >({});
  const [, setLoading] = useState(true);
  const [, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRegionsAndRuleCounts() {
      try {
        setLoading(true);

        const ruleCounts: Record<string, number> = {};
        for (const r of regions) {
          ruleCounts[r] = await fetchRegionRuleCount(r);
        }
        setRegionRuleCounts(ruleCounts);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load regions", err);
      } finally {
        setLoading(false);
      }
    }

    if (regions.length > 0) {
      loadRegionsAndRuleCounts();
    }
  }, [regions]);

  return (
    <Stack>
      {regions.map((r) => (
        <Button
          key={r}
          variant={region == r ? "subtle" : "ghost"}
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
