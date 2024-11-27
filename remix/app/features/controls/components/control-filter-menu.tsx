"use client";
import { Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Box, Flex, MenuItem, MenuSeparator } from "@chakra-ui/react";
import { Check, Filter } from "lucide-react";
import React from "react";

interface ControlFilterMenuProps {
  filterState: Record<string, string | null>; // 유연한 필터 상태
  onFilterChange: (filter: { type: string; value: string | null }) => void;
  filterOptions: Record<string, string[]>; // 필터 옵션을 동적으로 전달
  onResetFilters: () => void; // 필터 초기화 함수
}

const filterLabel = {
  label: "필터",
  region: {
    label: "지역 선택",
  },
  search: {
    placeholder: "제어 검색",
  },
  severity: {
    label: "심각도",
    values: {
      critical: "매우 중요",
      high: "높음",
      medium: "보통",
      low: "낮음",
    },
  },
  assigneeStatus: {
    label: "담당자 상태",
    values: {
      assigned: "할당됨",
      unassigned: "미할당",
    },
  },
};

export const ControlFilterMenu = ({
  filterState,
  onFilterChange,
  filterOptions,
  onResetFilters,
}: ControlFilterMenuProps) => {
  const getFilterLabel = (): JSX.Element => (
    <>
      <Filter />
      필터
    </>
  );

  const renderMenuItem = (type: string, value: string, label: string) => (
    <MenuItem
      key={`${type}:${value}`}
      onClick={() => onFilterChange({ type, value })}
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
        <Button
          variant="outline"
          onClick={(e) => {
            e.currentTarget.focus(); // 버튼에 포커스 설정
          }}
        >
          {getFilterLabel()}
        </Button>
      </MenuTrigger>
      <MenuContent minW="12rem" zIndex="1500">
        {Object.entries(filterOptions).map(([type, options], index) => (
          <React.Fragment key={type}>
            {index > 0 && <MenuSeparator />}
            <MenuItemGroup key={type} title={filterLabel[type]?.label || type}>
              {options.map((option) =>
                renderMenuItem(
                  type,
                  option,
                  filterLabel[type]?.values?.[option.toLowerCase()]
                )
              )}
            </MenuItemGroup>
          </React.Fragment>
        ))}
        <MenuSeparator />
        <MenuItemGroup>
          <MenuItem
            onClick={onResetFilters}
            value="reset"
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
          >
            필터 초기화
          </MenuItem>
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};
