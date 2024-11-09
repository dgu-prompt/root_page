import {
  Badge,
  Box,
  Card,
  Fieldset,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "~/components/ui/native-select";

type FilterType = "query_string" | "term" | "wildcard" | "range" | "bool";
type FilterData = { type: FilterType; value: { [key: string]: any } };

const ConfigFilter = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [filterType, setFilterType] = useState<FilterType | "">("");

  const addFilter = () => {
    setFilters([...filters, { type: filterType, value: {} }]);
    setFilterType(""); // 선택 초기화
  };

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type as FilterType);
  };

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Card.Title>
          {t("configFilter.filterTitle")}
          <Badge ms="2" size="xs" variant="surface">
            {t("configFilter.filterOptionalBadge")}
          </Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <VStack align="start" gap={6}>
          <Flex align="end" gap="4" w="full">
            <Field label={t("configFilter.filterTypeLabel")}>
              <NativeSelectRoot>
                <NativeSelectField
                  onChange={(e) => handleFilterTypeChange(e.target.value)}
                  placeholder={t("configFilter.filterTypePlaceholder")}
                  value={filterType}
                >
                  {["query_string", "term", "wildcard", "range", "bool"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {t(`configFilter.filterTypes.${type}`)}
                      </option>
                    )
                  )}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
            <Button
              colorScheme="blue"
              disabled={!filterType}
              onClick={addFilter}
            >
              {t("configFilter.addFilterButton")}
            </Button>
          </Flex>
        </VStack>
      </Card.Body>
      <Card.Footer>
        <VStack gap="4" w="full">
          {filters.map((filter, index) => (
            <Card.Root key={index} size="sm" variant="elevated" w="full">
              <Card.Header>
                <Card.Title>
                  <HStack justify="space-between">
                    <FilterTitle type={filter.type} />
                    <IconButton colorPalette="red" size="xs" variant="ghost">
                      <LuTrash2 />
                    </IconButton>
                  </HStack>
                </Card.Title>
                <Card.Description>
                  <FilterDescription type={filter.type} />
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <FilterItem type={filter.type} />
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Card.Footer>
    </Card.Root>
  );
};

const FilterTitle = ({ type }) => {
  const { t } = useTranslation();
  return <>{t(`configFilter.filterTypes.${type}`)}</>;
};

const FilterDescription = ({ type }) => {
  const { t } = useTranslation();
  return <>{t(`configFilter.filterDescriptions.${type}`)}</>;
};

const FilterItem = ({ type }) => {
  switch (type) {
    case "query_string":
      return <QueryStringFilter />;
    case "term":
      return <TermFilter />;
    case "wildcard":
      return <WildcardFilter />;
    case "range":
      return <RangeFilter />;
    case "bool":
      return <BooleanFilter />;
    default:
      return null;
  }
};

const QueryStringFilter = () => {
  const { t } = useTranslation();
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field
          label={t("configFilter.queryString.label")}
          orientation="horizontal"
        >
          <Input placeholder={t("configFilter.queryString.placeholder")} />
        </Field>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

const TermFilter = () => {
  const { t } = useTranslation();
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field
          label={t("configFilter.term.fieldLabel")}
          orientation="horizontal"
        >
          <Input placeholder={t("configFilter.term.fieldPlaceholder")} />
        </Field>
        <Field
          label={t("configFilter.term.valueLabel")}
          mt={2}
          orientation="horizontal"
        >
          <Input placeholder={t("configFilter.term.valuePlaceholder")} />
        </Field>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

const WildcardFilter = () => {
  const { t } = useTranslation();
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field
          label={t("configFilter.wildcard.fieldLabel")}
          orientation="horizontal"
        >
          <Input placeholder={t("configFilter.wildcard.fieldPlaceholder")} />
        </Field>
        <Field
          label={t("configFilter.wildcard.patternLabel")}
          mt={2}
          orientation="horizontal"
        >
          <Input placeholder={t("configFilter.wildcard.patternPlaceholder")} />
        </Field>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

const RangeFilter = () => {
  const { t } = useTranslation();
  return (
    <Stack gap="4">
      <Field label={t("configFilter.range.fieldLabel")}>
        <Input placeholder={t("configFilter.range.fieldPlaceholder")} />
      </Field>
      <Flex gap="4" mt={2}>
        <Field label={t("configFilter.range.fromLabel")}>
          <Input placeholder={t("configFilter.range.fromPlaceholder")} />
        </Field>
        <Field label={t("configFilter.range.toLabel")}>
          <Input placeholder={t("configFilter.range.toPlaceholder")} />
        </Field>
      </Flex>
    </Stack>
  );
};

const BooleanFilter = () => {
  const { t } = useTranslation();
  return (
    <Box borderRadius="md" borderWidth="1px" p={4}>
      <p>{t("configFilter.boolean.label")}</p>
    </Box>
  );
};

export default ConfigFilter;
