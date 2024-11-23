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
import { useTranslation } from "react-i18next";

import { Search, LayoutGrid, LayoutList } from "lucide-react";

import { ControlFilterMenu } from "./control-filter-menu";

import RegionSelect from "@/components/RegionSelect";
import { ComplianceStatus, Severity } from "../types/controls-types";

type ControlHeaderProps = {
  isSearching: boolean;
  isGridView: boolean;
  region?: string;
  handleRegionChange: (region: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsGridView: (isGridView: boolean) => void | undefined;
  filterState: {
    searchQuery?: string;
    hasJiraAssignee?: boolean | null;
    severity?: Severity | null;
    complianceStatus?: ComplianceStatus | null;
  };
  onFilterChange: (filter: {
    type: "searchQuery" | "hasJiraAssignee" | "severity" | "complianceStatus";
    value: string | null;
  }) => void;
};

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
  const { t } = useTranslation();

  return (
    <Card.Root
      mb="4"
      size={{
        base: "sm",
        md: "md",
      }}
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
          <Heading size="2xl">{t("controls.title")}</Heading>
          <Flex align="center" gap="8" width={{ base: "full", md: "md" }}>
            <Field label={t("filters.region.label")} orientation="horizontal">
              <RegionSelect
                onRegionChange={handleRegionChange}
                selectedRegion={region ?? ""}
              />
            </Field>
            {setIsGridView !== undefined && (
              <Flex>
                <IconButton
                  aria-label={t("buttons.view.grid.label")}
                  onClick={() => setIsGridView(true)}
                  variant={isGridView ? "surface" : "ghost"}
                >
                  <LayoutGrid />
                </IconButton>

                <IconButton
                  aria-label={t("buttons.view.table.label")}
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
                  placeholder={t("filters.search.placeholder")}
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
          />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
