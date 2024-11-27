import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";

import { Search, LayoutGrid, LayoutList } from "lucide-react";

import { ControlFilterMenu } from "./control-filter-menu";

import RegionSelect from "@/components/RegionSelect";
import { ComplianceStatus, Severity } from "../types/controls-types";

interface ControlHeaderProps {
  isSearching: boolean;
  isGridView: boolean;
  region?: string;
  handleRegionChange: (region: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsGridView: (isGridView: boolean) => void | undefined;
  filterState: {
    searchQuery?: string;
    severity?: Severity | null;
    // complianceStatus?: ComplianceStatus | null;
  };
  onFilterChange: (filter: {
    type: "searchQuery" | "severity";
    value: string | null;
  }) => void;
}

export default function ControlHeader(props: ControlHeaderProps) {
  const {
    isSearching,
    isGridView,
    filterState,
    onFilterChange,
    region,
    handleRegionChange,
    handleSearchChange,
    setIsGridView,
  } = props;

  return (
    <Card.Root
      mb="4"
      size={{
        base: "sm",
        md: "md",
      }}
      variant="elevated"
    >
      <Card.Body>
        {/* Header */}
        <Flex
          align={{ base: "start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap="4"
          justifyContent="space-between"
          mb="8"
        >
          <Heading size="2xl">제어 항목 관리</Heading>
          <Flex align="center" gap="8" width={{ base: "full", md: "md" }}>
            <Field label="리전 선택" orientation="horizontal">
              <RegionSelect
                onRegionChange={handleRegionChange}
                selectedRegion={region ?? ""}
              />
            </Field>
            {setIsGridView !== undefined && (
              <Flex>
                <IconButton
                  aria-label="그리드 보기"
                  onClick={() => setIsGridView(true)}
                  variant={isGridView ? "surface" : "ghost"}
                >
                  <LayoutGrid />
                </IconButton>

                <IconButton
                  aria-label="테이블 보기"
                  onClick={() => setIsGridView(false)}
                  variant={!isGridView ? "surface" : "ghost"}
                >
                  <LayoutList />
                </IconButton>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex gap="4">
          {/* Search */}
          <Box flex="1">
            <Form id="search-form" method="get" role="search">
              <InputGroup
                flex="1"
                startElement={
                  <Icon>
                    <Search />
                  </Icon>
                }
                width="full"
              >
                <Input
                  aria-label="Search controls"
                  className={isSearching ? "loading" : ""}
                  defaultValue={filterState.searchQuery}
                  id="q"
                  name="q"
                  onChange={handleSearchChange}
                  placeholder="제어 항목 검색"
                  type="search"
                />
              </InputGroup>
            </Form>
          </Box>

          {/* TODO */}
          <ControlFilterMenu
            filterState={filterState}
            onFilterChange={({ type, value }) =>
              onFilterChange({ type, value })
            }
            filterOptions={{
              severity: ["critical", "high", "medium", "low"],
              controlStatus: ["enabled", "disabled"],
              complianceStatus: ["passed", "failed", "no_data", "unknown"],
            }}
            onResetFilters={() => {}}
          />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

// // filterState={filters}
//           onFilterChange={({ type, value }) => onFilterChange({ type, value })}
//           filterOptions={{
//             controlStatus: ["enabled", "disabled"],
//             severity: ["critical", "high", "medium", "low"],
//           }}
//           onResetFilters={handleResetFilters}
