"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Flex, HStack, Icon, VStack, Text, Box } from "@chakra-ui/react";
import {
  CircleCheck,
  CircleDashed,
  CircleEllipsis,
  CircleMinus,
  CircleX,
} from "lucide-react";

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const complianceStatus = [
  { label: "통과", value: 198, color: "green.solid", icon: CircleCheck },
  { label: "실패", value: 65, color: "red.solid", icon: CircleX },
  {
    label: "데이터 없음",
    value: 30,
    color: "blue.solid",
    icon: CircleEllipsis,
  },
  { label: "알 수 없음", value: 0, color: "yellow.solid", icon: CircleDashed },
  { label: "비활성화됨", value: 149, color: "gray.solid", icon: CircleMinus },
];

export default function ControlStatusChart() {
  const [colors, setColors] = useState({});

  useEffect(() => {
    // 브라우저 환경에서만 CSS 변수를 읽어옵니다.
    const rootStyles = getComputedStyle(document.documentElement);
    setColors({
      passed: rootStyles
        .getPropertyValue("--chakra-colors-green-emphasized")
        .trim(),
      failed: rootStyles
        .getPropertyValue("--chakra-colors-red-emphasized")
        .trim(),
      noData: rootStyles
        .getPropertyValue("--chakra-colors-blue-emphasized")
        .trim(),
      unknown: rootStyles
        .getPropertyValue("--chakra-colors-yellow-emphasized")
        .trim(),
      disabled: rootStyles
        .getPropertyValue("--chakra-colors-gray-emphasized")
        .trim(),
    });
  }, []);

  // 색상이 로드되기 전에 차트를 그리지 않도록 조건을 추가
  if (!colors.passed) return null;

  // 차트 데이터
  const data = {
    labels: [""], // 라벨을 숨기기 위해 공백 사용
    datasets: [
      {
        label: "Passed",
        data: [198],
        backgroundColor: colors.passed,
      },
      {
        label: "Failed",
        data: [65],
        backgroundColor: colors.failed,
      },
      {
        label: "No Data",
        data: [30],
        backgroundColor: colors.noData,
      },
      {
        label: "Unknown",
        data: [0],
        backgroundColor: colors.unknown,
      },
      {
        label: "Disabled",
        data: [149],
        backgroundColor: colors.disabled,
      },
    ],
  };

  // 차트 옵션
  const options = {
    indexAxis: "y", // 가로형 막대 그래프
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true, // 스택 설정
        display: false,
      },
      y: {
        stacked: true, // 스택 설정
        display: false,
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 4,
          bottomRight: 4,
        }, // 막대의 둥근 모서리 설정
        borderSkipped: false, // 막대의 테두리 안 보이게 설정
      },
    },
  };

  return (
    <Box>
      <VStack gap="4">
        <Flex width="full" height="48px">
          <Bar data={data} options={options} />
        </Flex>
        <HStack gap="4">
          {complianceStatus.map((status) => (
            <HStack key={status.label} gap="2">
              <Icon color={status.color}>
                <status.icon />
              </Icon>
              <Text fontSize="sm" color="fg.muted">
                {status.label}: {status.value}
              </Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
