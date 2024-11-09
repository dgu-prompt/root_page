import { Badge, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "~/components/ui/native-select";

// 더미 제어 항목 데이터
const dummyControls = [
  {
    id: "1",
    title: "S3 Bucket Access",
    description: "Restrict public access to S3 buckets.",
    region: "us-west-2",
    status: "ENABLED",
    assignee: "John Doe",
    severity: "HIGH",
  },
  {
    id: "2",
    title: "EC2 Security Group Review",
    description: "Review security groups for EC2 instances.",
    region: "us-east-1",
    status: "DISABLED",
    assignee: "Jane Smith",
    severity: "MEDIUM",
  },
  {
    id: "3",
    title: "IAM MFA Enabled",
    description: "Enable MFA for IAM users.",
    region: "eu-central-1",
    status: "ENABLED",
    assignee: "Alice Brown",
    severity: "CRITICAL",
  },
  // 추가 제어 항목 ...
];

const sortOptions = [
  { label: "Region", value: "region" },
  { label: "Status", value: "status" },
  { label: "Assignee", value: "assignee" },
  { label: "Severity", value: "severity" },
];

function ControlSelection() {
  const [sortBy, setSortBy] = useState("region");

  const sortedControls = [...dummyControls].sort((a, b) => {
    if (sortBy === "region") return a.region.localeCompare(b.region);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "assignee") return a.assignee.localeCompare(b.assignee);
    if (sortBy === "severity") return a.severity.localeCompare(b.severity);
    return 0;
  });

  return (
    <Box p={6}>
      {/* 정렬 옵션 */}
      <NativeSelectRoot>
        <NativeSelectField
          mb={4}
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>

      {/* 제어 항목 리스트 */}
      <Grid gap={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
        {sortedControls.map((control) => (
          <GridItem
            borderRadius="md"
            borderWidth="1px"
            key={control.id}
            p={4}
            shadow="md"
          >
            <Checkbox colorScheme="blue" mb={2}>
              {control.title}
            </Checkbox>
            <Text color="gray.500" fontSize="sm" mb={1}>
              {control.description}
            </Text>
            <Badge colorScheme="green" mr={1}>
              {control.region}
            </Badge>
            <Badge colorScheme={control.status === "ENABLED" ? "blue" : "red"}>
              {control.status}
            </Badge>
            <Text color="gray.600" fontSize="sm">
              Assignee: {control.assignee}
            </Text>
            <Text color="gray.600" fontSize="sm">
              Severity: {control.severity}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default ControlSelection;
