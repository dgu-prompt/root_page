import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Text,
  Box,
  Icon,
  Flex,
  HStack,
  AspectRatio,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Square } from "lucide-react";

// Chart.js 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const task = [
  { label: "할 일", value: 10, color: "gray.emphasized", icon: Square },
  { label: "진행 중", value: 15, color: "blue.emphasized", icon: Square },
  { label: "완료", value: 10, color: "green.emphasized", icon: Square },
];

const TaskPieChart = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setColors({
      todo: rootStyles
        .getPropertyValue("--chakra-colors-gray-emphasized")
        .trim(),
      inProgress: rootStyles
        .getPropertyValue("--chakra-colors-blue-emphasized")
        .trim(),
      done: rootStyles
        .getPropertyValue("--chakra-colors-green-emphasized")
        .trim(),
    });
  }, []);

  if (!colors.todo) return null; // 색상이 준비되지 않았으면 차트를 렌더링하지 않음

  // 차트 데이터
  const data = {
    labels: ["해야할 일", "진행 중", "완료"],
    datasets: [
      {
        data: [10, 15, 10], // 해야할 일, 진행 중, 완료 개수
        backgroundColor: [colors.todo, colors.inProgress, colors.done], // 색상
        borderWidth: 0,
      },
    ],
  };

  // 차트 옵션
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true, // 반응형 크기 설정
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <HStack gap="12">
        <Flex height="full">
          <Doughnut data={data} options={options} />
        </Flex>
        <Stack gap="4">
          {task.map((item) => (
            <HStack key={item.label} minWidth="40" justify="space-between">
              <HStack gap="2" align="center">
                <Icon>
                  <Box rounded="sm" bg={item.color} />
                </Icon>
                <Text fontSize="sm" color="fg.muted">
                  {item.label}
                </Text>
              </HStack>
              <Text fontSize="sm" color="fg.muted">
                {item.value}
              </Text>
            </HStack>
          ))}
          <HStack minWidth="40" justify="space-between">
            <Text fontSize="sm" fontWeight="semibold">
              전체
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              35
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </AspectRatio>
  );
};

export default TaskPieChart;
