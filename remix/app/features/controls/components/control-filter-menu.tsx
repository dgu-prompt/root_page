"use client";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Box, Flex, MenuItem } from "@chakra-ui/react";
import { Check, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ComplianceStatus, Severity } from "../types/controls-types";

type ControlFilterMenuProps = {
  filterState: {
    hasJiraAssignee?: boolean | null;
    severity?: Severity | null;
    complianceStatus?: ComplianceStatus | null;
  };
  onFilterChange: (filter: {
    type: "hasJiraAssignee" | "severity" | "complianceStatus";
    value: string | null;
  }) => void;
};

const FILTER_OPTIONS = {
  hasJiraAssignee: [true, false],
  severity: ["CRITICAL", "HIGH", "MEDIUM", "LOW"],
  complianceStatus: ["PASSED", "FAILED", "DISABLED", "UNKNOWN"],
} as const;

export const ControlFilterMenu = ({
  filterState,
  onFilterChange,
}: ControlFilterMenuProps) => {
  const { t } = useTranslation();

  // Filter label rendering
  const getFilterLabel = (): JSX.Element => (
    <>
      <Filter />
      {t("filters.label")}
    </>
  );

  // Render a single menu item with a check icon if active
  const renderMenuItem = (
    type: "hasJiraAssignee" | "severity" | "complianceStatus",
    value: string | boolean,
    label: string
  ) => (
    <MenuItem
      key={`${type}:${value}`}
      onClick={() => {
        console.log("type:", type);
        console.log("value:", value);

        onFilterChange({ type, value: String(value) });
      }}
      value={`${type}:${value}`}
    >
      <Flex align="center" justify="space-between" width="100%">
        <Box>{label}</Box>
        {filterState[type] === value && <Check size={16} />}
      </Flex>
    </MenuItem>
  );

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">{getFilterLabel()}</Button>
      </MenuTrigger>
      <MenuContent minW="12rem">
        {/* Assignee Status */}
        <MenuItemGroup title={t("filters.hasJiraAssignee.label")}>
          {FILTER_OPTIONS.hasJiraAssignee.map((status) =>
            renderMenuItem(
              "hasJiraAssignee",
              status,
              t(`filters.hasJiraAssignee.values.${status}`)
            )
          )}
        </MenuItemGroup>

        {/* Severity */}
        <MenuItemGroup title={t("filters.severity.label")}>
          {FILTER_OPTIONS.severity.map((level) =>
            renderMenuItem(
              "severity",
              level,
              t(`filters.severity.values.${level.toLowerCase()}`)
            )
          )}
        </MenuItemGroup>

        {/* Compliance Status */}
        <MenuItemGroup title={t("filters.complianceStatus.label")}>
          {FILTER_OPTIONS.complianceStatus.map((status) =>
            renderMenuItem(
              "complianceStatus",
              status,
              t(`filters.complianceStatus.values.${status.toLowerCase()}`)
            )
          )}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};
