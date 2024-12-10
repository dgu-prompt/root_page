"use client";

import type { RuleSummary } from "rule";
import { HStack, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Ellipsis, SquarePen, Trash } from "lucide-react";
import AlertTypeBadge from "./alert-type-badge";
import Link from "next/link";

export default function RuleListItem({ rule }: { rule: RuleSummary }) {
  return (
    <HStack justifyContent="space-between" py="4">
      <Stack gap="1">
        <HStack>
          <Text fontWeight="medium">{rule.name}</Text>
          <AlertTypeBadge type={rule.alertType} />
        </HStack>
        <Text fontSize="sm" color="fg.muted">
          {rule.description}
        </Text>
      </Stack>
      <MenuRoot positioning={{ placement: "bottom-end" }}>
        <MenuTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <Ellipsis />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <Link href={`/rules/${rule.id}/edit`}>
            <MenuItem value="edit">
              <Icon>
                <SquarePen />
              </Icon>
              편집
            </MenuItem>
          </Link>
          <MenuItem value="delete">
            <Icon>
              <Trash />
            </Icon>
            삭제
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </HStack>
  );
}
