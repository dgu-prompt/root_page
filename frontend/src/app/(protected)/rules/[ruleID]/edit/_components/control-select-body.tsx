"use client";

import type { ControlWithStatus } from "control";
import { Fragment, useEffect, useState } from "react";
import { Check, CirclePlus, Search, X } from "lucide-react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { SkeletonText } from "@/components/ui/skeleton";
import ControlFilterMenu from "../../../../_components/control-filter-menu";
import SeverityBadge from "../../../../_components/severity-badge";
import Pagination from "./pagination";

export default function ControlSelectBody({
  region,
  addedControlIds,
  setAddedControlIds,
}: ControlSelectBodyProps) {
  const [controls, setControls] = useState<ControlWithStatus[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    controlStatus: null,
    severity: null,
  });
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.searchQuery)
        params.append("searchKeyword", filters.searchQuery);
      if (filters.severity)
        params.append("filter[severity]", filters.severity.toUpperCase());
      if (filters.controlStatus)
        params.append("filter[status]", filters.controlStatus.toUpperCase());
      params.append("page", String(page));
      params.append("pageSize", String(pageSize));

      console.log(
        "fetching from: ",
        `${process.env.NEXT_PUBLIC_API_HOST}/notificationRule?${params}`
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/notificationRule?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }, // 캐싱과 재검증 설정
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
      }

      const { controls, totalCount } = await response.json();
      console.log(controls);
      setControls(controls);
      setTotalCount(totalCount);
      setLoading(false);
    }

    fetchData();
  }, [filters, page, region]);

  function handleCheckChange(controlId: string) {
    console.log("clicked checkchange button");

    setAddedControlIds((prev) => {
      if (prev.includes(controlId)) {
        return prev.filter((id) => id !== controlId);
      } else {
        return [...prev, controlId];
      }
    });
  }

  const handlePageChange = (details: { page: number }) => {
    setPage(details.page);
  };

  const onFilterChange = ({
    type,
    value,
  }: {
    type: string;
    value: string | null;
  }) => {
    setFilters((prev) => {
      const newValue = prev[type] === value ? null : value; // 동일한 값 클릭 시 null로 설정
      return {
        ...prev,
        [type]: newValue,
        page: 1, // 필터 변경 시 페이지 초기화
      };
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <>
      <HStack align="center">
        <InputGroup
          flex="1"
          startElement={
            <Icon>
              <Search />
            </Icon>
          }
          endElement={
            filters.searchQuery && (
              <Icon
                color="fg"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: "",
                    page: 1,
                  }))
                }
              >
                <X />
              </Icon>
            )
          }
          width="full"
        >
          <Input
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                searchQuery: e.target.value,
                page: 1,
              }))
            }
            placeholder="제어 검색"
            value={filters.searchQuery}
          />
        </InputGroup>

        <ControlFilterMenu
          filterState={filters}
          onFilterChange={({ type, value }) => onFilterChange({ type, value })}
          filterOptions={{
            controlStatus: ["enabled", "disabled"],
            severity: ["critical", "high", "medium", "low"],
          }}
          onResetFilters={handleResetFilters}
        />
      </HStack>

      {loading ? (
        <Stack gap="4" mt="8">
          <Box>
            <Separator />
            {Array.from({ length: 15 }).map((_, index) => (
              <Fragment key={index}>
                {index !== 0 && <Separator />}
                <Box py="4">
                  <SkeletonText noOfLines={2}>Loading</SkeletonText>
                </Box>
              </Fragment>
            ))}
          </Box>
        </Stack>
      ) : (
        <Stack gap="4" mt="8">
          <Text>
            {region}에서 {totalCount}개의 제어 찾음
          </Text>
          <Box>
            <Separator />
            {controls &&
              controls.map((control, index) => {
                const isChecked = addedControlIds.includes(control.controlId);
                return (
                  <Fragment key={control.controlId}>
                    {index !== 0 && <Separator />}
                    <Flex align="center" justify="space-between" py="4">
                      <Flex
                        direction="column"
                        align="baseline"
                        gap="1"
                        justify="space-between"
                      >
                        <HStack>
                          {control.controlStatus.toLowerCase() === "enabled" ? (
                            <Text fontWeight="medium">{control.controlId}</Text>
                          ) : (
                            <Text fontWeight="medium" color="fg.muted">
                              {control.controlId} (비활성화됨)
                            </Text>
                          )}
                          <SeverityBadge severity={control.severity} />
                        </HStack>
                        <Text fontSize="sm" color="fg.muted">
                          {control.title}
                        </Text>
                      </Flex>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        value={control.controlId}
                        onClick={() => handleCheckChange(control.controlId)}
                      >
                        {isChecked ? <Check /> : <CirclePlus />}
                      </IconButton>
                    </Flex>
                  </Fragment>
                );
              })}
            <Separator />
            <Pagination
              totalCount={totalCount}
              currentPage={page}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          </Box>
        </Stack>
      )}
    </>
  );
}
