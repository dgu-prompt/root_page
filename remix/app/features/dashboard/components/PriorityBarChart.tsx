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
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Equal,
} from "lucide-react";
import {
  Text,
  Box,
  Icon,
  Flex,
  AspectRatio,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const priorities = [
  { label: "Highest", value: 5, color: "red.solid", icon: ChevronsUp },
  { label: "High", value: 11, color: "orange.solid", icon: ChevronUp },
  { label: "Medium", value: 4, color: "yellow.solid", icon: Equal },
  { label: "Low", value: 4, color: "teal.solid", icon: ChevronDown },
  { label: "Lowest", value: 1, color: "blue.solid", icon: ChevronsDown },
];

const PriorityBarChart = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    // 브라우저 환경에서만 CSS 변수를 읽어옵니다.
    const rootStyles = getComputedStyle(document.documentElement);
    setColors({
      highest: rootStyles
        .getPropertyValue("--chakra-colors-red-emphasized")
        .trim(),
      high: rootStyles
        .getPropertyValue("--chakra-colors-orange-emphasized")
        .trim(),
      medium: rootStyles
        .getPropertyValue("--chakra-colors-yellow-emphasized")
        .trim(),
      low: rootStyles
        .getPropertyValue("--chakra-colors-teal-emphasized")
        .trim(),
      lowest: rootStyles
        .getPropertyValue("--chakra-colors-blue-emphasized")
        .trim(),
    });
  }, []);

  // 색상이 로드되기 전에 차트를 그리지 않도록 조건 추가
  if (!colors.highest) return null;

  // 차트 데이터
  const data = {
    labels: ["우선순위"], // 카테고리
    datasets: [
      { label: "Highest", data: [5], backgroundColor: colors.highest },
      { label: "High", data: [11], backgroundColor: colors.high },
      { label: "Medium", data: [4], backgroundColor: colors.medium },
      { label: "Low", data: [4], backgroundColor: colors.low },
      { label: "Lowest", data: [1], backgroundColor: colors.lowest },
    ],
  };

  // 차트 옵션
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        display: false, // x축 표시
        title: {
          display: true,
          text: "우선순위",
        },
        grid: { display: false }, // x축 격자 숨기기
      },
      y: {
        display: true, // y축 표시
        title: {
          display: false,
          text: "Count",
        },
        grid: { display: true }, // y축 격자 표시
        ticks: { stepSize: 5 },
      },
    },
    elements: {
      bar: {
        borderRadius: 4, // 막대의 둥근 모서리 설정
        borderSkipped: false, // 막대의 테두리 숨김
      },
    },
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <VStack gap="4">
        <Flex width="full" flexGrow={1}>
          <Bar data={data} options={options} />
        </Flex>
        <HStack gap="4">
          {priorities.map((priority) => (
            <HStack key={priority.label} gap="2">
              <Icon color={priority.color}>
                <priority.icon />
              </Icon>
              <Text fontSize="sm" color="fg.muted">
                {priority.label}: {priority.value}
              </Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </AspectRatio>
  );
};

export default PriorityBarChart;
