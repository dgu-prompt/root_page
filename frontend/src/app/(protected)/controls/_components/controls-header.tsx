"use client";

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
import { useRouter, useSearchParams } from "next/navigation";

import { Search, LayoutGrid, LayoutList } from "lucide-react";

import ControlFilterMenu from "../../_components/control-filter-menu";

// import RegionSelect from "@/components/RegionSelect";

interface ControlHeaderProps {
  initialSearchQuery: string;
  initialSeverity: Severity | null;
  initialControlStatus: ControlStatus | null;
  initialComplianceStatus: ComplianceStatus | null;
  initialRegion?: string;
}

export default function ControlsHeader({
  initialSearchQuery,
  initialSeverity,
  initialControlStatus,
  initialComplianceStatus,
  initialRegion,
}: ControlHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGridView = true;
  const filterState = {
    searchQuery: initialSearchQuery,
    severity: initialSeverity,
    controlStatus: initialControlStatus,
    complianceStatus: initialComplianceStatus,
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("q")?.toString() || "";

    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    } else {
      params.delete("searchQuery");
    }

    router.push(`?${params.toString()}`); // URL 업데이트
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (newSearchQuery) {
      params.set("q", newSearchQuery);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  };

  const onFilterChange = ({
    type,
    value,
  }: {
    type: "searchQuery" | "severity";
    value: string | null;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`?${params.toString()}`);
  };

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
              {/* <RegionSelect
                onRegionChange={handleRegionChange}
                selectedRegion={region ?? ""}
              /> */}
            </Field>

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
          </Flex>
        </Flex>

        <Flex gap="4">
          {/* Search */}
          <Box flex="1">
            <form
              id="search-form"
              method="get"
              role="search"
              onSubmit={handleSearch}
            >
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
                  defaultValue={initialSearchQuery}
                  id="q"
                  name="q"
                  placeholder="제어 항목 검색"
                  type="search"
                />
              </InputGroup>
            </form>
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
