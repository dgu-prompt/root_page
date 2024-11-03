import {
  Box,
  Flex,
  StatDownIndicator,
  StatUpIndicator,
} from "@chakra-ui/react";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "~/components/ui/stat";

export default function Index() {
  return (
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
  );
}
