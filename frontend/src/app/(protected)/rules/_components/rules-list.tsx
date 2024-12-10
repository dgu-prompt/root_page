"use client";

import type { RegionalRuleSummary } from "rule";
import { Fragment } from "react";
import { Plus, ScrollText } from "lucide-react";
import { Box, Card, Icon, Separator, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useRegion } from "../../_contexts/region-context";
import NewRuleMenu from "./new-rule-menu";
import RuleListItem from "./rule-list-item";

export default function RulesList({
  regionalRules,
}: {
  regionalRules: RegionalRuleSummary[];
}) {
  const { currentRegion } = useRegion();
  const rules = regionalRules.find(
    (item) => item.region === currentRegion
  )?.yamlName;

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Card.Title>{currentRegion} 알림 규칙</Card.Title>
            {rules?.length ? (
              <Card.Description>
                {currentRegion}의 제어에 적용되는 {rules.length}개의 규칙이
                있습니다.
              </Card.Description>
            ) : null}
          </Stack>
          <NewRuleMenu>
            <Button size="sm">
              <Icon>
                <Plus />
              </Icon>
              <Box>새 규칙</Box>
            </Button>
          </NewRuleMenu>
        </Stack>
      </Card.Header>
      <Card.Body>
        {rules?.length ? (
          rules.map((rule, index) => (
            <Fragment key={index}>
              {index !== 0 && <Separator />}
              <RuleListItem key={rule.id} rule={rule} />
            </Fragment>
          ))
        ) : (
          <EmptyState
            description="새 규칙을 추가하면 제어 항목에 대한 알림을 받을 수 있습니다."
            icon={<ScrollText />}
            title="아직 등록된 규칙이 없습니다."
          />
        )}
      </Card.Body>
    </Card.Root>
  );
}
