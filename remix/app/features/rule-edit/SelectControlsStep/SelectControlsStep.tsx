// 대대적 개편이 필요함

import { CheckboxCard } from "@/components/ui/checkbox-card";
import { InputGroup } from "@/components/ui/input-group";
import {
  Card,
  Center,
  HStack,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Search } from "lucide-react";

import { ControlFilterMenu } from "../../controls/components/control-filter-menu";
import { JiraRuleProps } from "../JiraRuleData";
import Pagination from "@/components/pagination";
import SeverityBadge from "@features/controls/components/severity-badge";
import { fetchControlAggregate } from "@features/controls/services/control-aggregates.service";
import type {
  ComplianceStatus,
  ControlAggregate,
  Severity,
} from "@features/controls/types/controls-types";

type FilterState = {
  searchQuery?: string;
  hasJiraAssignee?: boolean | null;
  severity?: Severity | null;
  complianceStatus?: ComplianceStatus | null;
};

const SelectControlsStep = ({
  jiraRuleData,
  setJiraRuleData,
}: JiraRuleProps) => {
  const { t } = useTranslation();

  const [controls, setControls] = useState<ControlAggregate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    hasJiraAssignee: null,
    severity: null,
    complianceStatus: null,
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);

  const { searchQuery, hasJiraAssignee, severity, complianceStatus } =
    filterState;
  const region = jiraRuleData.awsRegion;

  const fetchControlsData = useCallback(async () => {
    setLoading(true);
    try {
      // 데이터 가져오기
      const response = await fetchControlAggregate({
        region,
        filters: { searchQuery, hasJiraAssignee, severity, complianceStatus },
        page,
        pageSize,
      });

      if (response.ok) {
        const { controls, totalCount } = response;
        setControls(controls);
        setTotalCount(totalCount);
      } else {
        console.error("Failed to fetch controls:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch controls:", error);
    } finally {
      setLoading(false);
    }
  }, [
    region,
    searchQuery,
    hasJiraAssignee,
    severity,
    complianceStatus,
    page,
    pageSize,
  ]);

  // TODO: DI
  useEffect(() => {
    fetchControlsData();
  }, [filterState, fetchControlsData]);

  const handleCheckboxChange = (controlId: string) => {
    setJiraRuleData((prev) => {
      // 현재 기본 상태
      const defaultState =
        controls.find((control) => control.controlId === controlId)
          ?.jiraAssigneeId === prev.jiraAssignee;

      // 현재 선택 상태
      const isSelected = prev.modifiedSecurityControlIds.added.includes(
        controlId
      )
        ? true
        : prev.modifiedSecurityControlIds.removed.includes(controlId)
          ? false
          : defaultState;

      // 새로운 상태 (현재 상태 반전)
      const newState = !isSelected;

      console.log("Control ID:", controlId);
      console.log("Default state:", defaultState);
      console.log("Current state:", isSelected);
      console.log("New state:", newState);

      const updatedAdded = prev.modifiedSecurityControlIds.added.filter(
        (id) => id !== controlId
      );

      const updatedRemoved = prev.modifiedSecurityControlIds.removed.filter(
        (id) => id !== controlId
      );

      if (newState && !defaultState) {
        // 새로 추가된 상태
        updatedAdded.push(controlId);
      } else if (!newState && defaultState) {
        // 기본 상태에서 제거된 상태
        updatedRemoved.push(controlId);
      }

      console.log("Updated 'added' array:", updatedAdded);
      console.log("Updated 'removed' array:", updatedRemoved);

      return {
        ...prev,
        modifiedSecurityControlIds: {
          added: updatedAdded,
          removed: updatedRemoved,
          modified: prev.modifiedSecurityControlIds.modified,
        },
      };
    });
  };

  const setFilters = (updateFn: (prev: FilterState) => FilterState) => {
    setFilterState((prev) => {
      const newState = updateFn(prev);
      setPage(1); // Reset to first page whenever filters change
      return newState;
    });
  };

  const onFilterChange = ({
    type,
    value,
  }: {
    type: "hasJiraAssignee" | "severity" | "complianceStatus";
    value: string | null;
  }) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handlePageChange = ({ page }: { page: number }) => {
    setPage(page);
  };

  return (
    <Card.Root>
      <Card.Body>
        <HStack align="center">
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
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  query: e.target.value,
                  page: 1,
                }))
              }
              placeholder="제어 검색"
              value={searchQuery}
            />
          </InputGroup>

          <ControlFilterMenu
            filterState={filterState}
            onFilterChange={({ type, value }) =>
              onFilterChange({ type, value })
            }
          />
        </HStack>

        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Stack gap="4" mt="8">
            <Text>{totalCount}개의 제어 찾음</Text>

            {controls.map((control) => {
              const isChecked =
                jiraRuleData.modifiedSecurityControlIds.added.includes(
                  control.controlId
                )
                  ? true
                  : jiraRuleData.modifiedSecurityControlIds.removed.includes(
                        control.controlId
                      )
                    ? false
                    : control.jiraAssigneeId === jiraRuleData.jiraAssignee;

              const isModified =
                jiraRuleData.modifiedSecurityControlIds.added.includes(
                  control.controlId
                ) ||
                jiraRuleData.modifiedSecurityControlIds.removed.includes(
                  control.controlId
                );

              return (
                <CheckboxCard
                  background={isModified ? "bg.info" : "none"}
                  checked={isChecked}
                  colorPalette={isModified ? "blue" : "gray"}
                  description={
                    <>
                      <Text display="inline" me="2">
                        {control.controlStatus}
                      </Text>
                      <SeverityBadge severity={control.severity} />
                      <Text display="inline" ms="2">
                        {control.title}
                      </Text>
                    </>
                  }
                  key={control.controlId}
                  label={
                    <>
                      {`${control.controlId} - ${control.jiraAssigneeName || ""}`}
                      {isModified && (
                        <>
                          {jiraRuleData.modifiedSecurityControlIds.added.includes(
                            control.controlId
                          ) ? (
                            <Text as="span" color="blue.500">
                              {/* 현재 편집 중인 담당자 이름 */}
                              {`(${t("controls.modifiedTo")} ${jiraRuleData.jiraAssignee})`}
                            </Text>
                          ) : (
                            <Text as="span" color="red.500">
                              {/* 담당자 없음 */}
                              {`(${t("controls.modifiedToNone")})`}
                            </Text>
                          )}
                        </>
                      )}
                    </>
                  }
                  onChange={() => handleCheckboxChange(control.controlId)}
                  value={control.controlId}
                  width="full"
                />
              );
            })}
          </Stack>
        )}

        <Pagination
          totalCount={totalCount}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default SelectControlsStep;
