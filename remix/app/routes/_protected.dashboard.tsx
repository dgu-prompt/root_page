import {
  Box,
  Flex,
  HStack,
  Heading,
  StatDownIndicator,
  StatUpIndicator,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "~/components/ui/stat";
import { Button } from "~/components/ui/button";
import RegionSelect from "~/components/RegionSelect"; // Assuming you have a RegionSelect component
import { Switch } from "~/components/ui/switch";
import { useState } from "react";

type SecurityControl = {
  SecurityControlId: string;
  Title: string;
  Description: string;
  SeverityRating: string;
  SecurityControlStatus: string;
};

type DashboardProps = {
  regionData: { [key: string]: SecurityControl[] };
};

const Dashboard = ({ regionData = {} }: DashboardProps) => {
  const [selectedRegion, setSelectedRegion] = useState("us-east-1");
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");

  const controls = regionData[selectedRegion] || [];

  return (
    <>
      <Heading mb={4}>Security Hub Dashboard</Heading>

      <HStack gap={4} mb={4}>
        <Text fontSize="sm">View Mode:</Text>
        <Switch
          checked={viewMode === "detailed"}
          onChange={() =>
            setViewMode(viewMode === "summary" ? "detailed" : "summary")
          }
          colorScheme="teal"
        />
        <Text fontSize="sm">
          {viewMode === "summary" ? "Summary View" : "Detailed View"}
        </Text>
      </HStack>

      {viewMode === "summary" ? (
        <>
          <Flex gap="4" wrap="wrap">
            {/* 활성화된 항목 수 카드 */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              w="full"
              maxW="xs"
              bg="bg"
            >
              <StatRoot>
                <StatLabel>활성화된 항목 수</StatLabel>
                <StatValueText>25</StatValueText>
                <StatHelpText>
                  <StatUpIndicator /> 5% 증가
                </StatHelpText>
              </StatRoot>
            </Box>

            {/* 비활성화된 항목 수 카드 */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              w="full"
              maxW="xs"
              bg="bg"
            >
              <StatRoot>
                <StatLabel>비활성화된 항목 수</StatLabel>
                <StatValueText>10</StatValueText>
                <StatHelpText>
                  <StatDownIndicator /> 2% 감소
                </StatHelpText>
              </StatRoot>
            </Box>

            {/* 심각도 분포 카드 */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              w="full"
              maxW="xs"
              bg="bg"
            >
              <StatRoot>
                <StatLabel>심각도 (HIGH)</StatLabel>
                <StatValueText>8</StatValueText>
              </StatRoot>
              <StatRoot>
                <StatLabel>심각도 (MEDIUM)</StatLabel>
                <StatValueText>15</StatValueText>
              </StatRoot>
              <StatRoot>
                <StatLabel>심각도 (LOW)</StatLabel>
                <StatValueText>5</StatValueText>
              </StatRoot>
            </Box>

            {/* 업데이트 상태 카드 */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              w="full"
              maxW="xs"
              bg="bg"
            >
              <StatRoot>
                <StatLabel>업데이트 상태 (READY)</StatLabel>
                <StatValueText>20</StatValueText>
              </StatRoot>
              <StatRoot>
                <StatLabel>업데이트 상태 (UPDATING)</StatLabel>
                <StatValueText>5</StatValueText>
              </StatRoot>
            </Box>
          </Flex>
        </>
      ) : (
        <VStack align="stretch" gap={4}>
          <RegionSelect
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
          {controls.map((control) => (
            <Box
              key={control.SecurityControlId}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="lg">
                  {control.Title}
                </Text>
                <Switch
                  checked={control.SecurityControlStatus === "ENABLED"}
                  // onChange={() => ()}
                />
              </HStack>
              <Text color="gray.600" fontSize="sm">
                {control.Description}
              </Text>
              <HStack justify="space-between" mt={2}>
                <Text
                  fontSize="sm"
                  color={
                    control.SeverityRating === "HIGH" ? "red.500" : "gray.700"
                  }
                >
                  Severity: {control.SeverityRating}
                </Text>
                <Button size="sm" colorScheme="teal" variant="outline">
                  View Details
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
};

export default Dashboard;
