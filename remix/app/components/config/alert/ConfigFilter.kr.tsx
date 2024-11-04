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
import {
  NativeSelectField,
  NativeSelectRoot,
} from "~/components/ui/native-select";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";

// 필터 타입 정의
type FilterType = "query_string" | "term" | "wildcard" | "range" | "bool";

// 필터 데이터 타입 정의
type FilterData = {
  type: FilterType;
  value: { [key: string]: any };
};

const ConfigFilter = () => {
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
    <Card.Root
      size={{
        base: "sm",
        md: "md",
        lg: "lg",
      }}
    >
      <Card.Header>
        <Card.Title>
          필터
          <Badge size="xs" variant="surface" ms="2">
            Optional
          </Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <VStack gap={6} align="start">
          <Flex align="end" gap="4" w="full">
            <Field label="필터 유형">
              <NativeSelectRoot>
                <NativeSelectField
                  placeholder="필터 유형 선택"
                  value={filterType}
                  onChange={(e) => handleFilterTypeChange(e.target.value)}
                >
                  <option value="query_string">Query String</option>
                  <option value="term">Term</option>
                  <option value="wildcard">Wildcard</option>
                  <option value="range">Range</option>
                  <option value="bool">Boolean</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            <Button
              onClick={addFilter}
              colorScheme="blue"
              disabled={!filterType}
            >
              필터 추가
            </Button>
          </Flex>
        </VStack>
      </Card.Body>
      <Card.Footer>
        <VStack w="full" gap="4">
          {filters.map((filter, index) => (
            <Card.Root key={index} w="full" size="sm">
              <Card.Header>
                <Card.Title>
                  <HStack justify="space-between">
                    <FilterTitle key={index} type={filter.type} />
                    <IconButton size="xs" variant="ghost" colorPalette="red">
                      <LuTrash2 />
                    </IconButton>
                  </HStack>
                </Card.Title>
                <Card.Description>
                  <FiltertDescription key={index} type={filter.type} />
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <FilterItem key={index} type={filter.type} />
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Card.Footer>
    </Card.Root>
  );
};

const FilterTitle = ({ type }) => {
  switch (type) {
    case "query_string":
      return "쿼리 문자열";
    case "term":
      return "용어";
    case "wildcard":
      return "와일드카드";
    case "range":
      return "범위";
    case "bool":
      return "불리언";
    default:
      return null;
  }
};

const FiltertDescription = ({ type }) => {
  switch (type) {
    case "query_string":
      return "쿼리 문자열 유형은 Lucene 쿼리 형식을 따르며 여러 필드에 대한 부분 또는 전체 일치를 위해 사용할 수 있습니다.";
    case "term":
      return "용어 유형은 정확한 필드 일치를 허용합니다.";
    default:
      return null;
  }
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

// 각 필터 컴포넌트
const QueryStringFilter = () => (
  <Fieldset.Root>
    <Fieldset.Content>
      <Field orientation="horizontal" label="쿼리">
        <Input placeholder="username: bob" />
      </Field>
    </Fieldset.Content>
  </Fieldset.Root>
);

const TermFilter = () => (
  <Fieldset.Root>
    <Fieldset.Content>
      <Field orientation="horizontal" label="필드">
        <Input placeholder="name_field" />
      </Field>
      <Field orientation="horizontal" label="값" mt={2}>
        <Input placeholder="bob" />
      </Field>
    </Fieldset.Content>
  </Fieldset.Root>
);

const WildcardFilter = () => (
  <Fieldset.Root>
    <Fieldset.Content>
      <Field orientation="horizontal" label="필드">
        <Input placeholder="field" />
      </Field>
      <Field orientation="horizontal" label="패턴" mt={2}>
        <Input placeholder="foo*bar" />
      </Field>
    </Fieldset.Content>
  </Fieldset.Root>
);

const RangeFilter = () => (
  <Stack gap="4">
    <Field label="Field">
      <Input placeholder="status_code" />
    </Field>
    <Flex mt={2} gap="4">
      <Field label="시작값">
        <Input placeholder="500" />
      </Field>
      <Field label="종료값">
        <Input placeholder="599" />
      </Field>
    </Flex>
  </Stack>
);

const BooleanFilter = () => (
  <Box p={4} borderWidth="1px" borderRadius="md">
    {/* <FormLabel>Boolean Logic (must, must_not, should)</FormLabel> */}
    {/* 추후 논리적 필터 추가 기능을 구현 */}
  </Box>
);

export default ConfigFilter;
