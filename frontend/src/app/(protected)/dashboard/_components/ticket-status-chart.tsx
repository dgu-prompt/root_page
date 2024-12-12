import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
import { Square } from "lucide-react";

// Chart.js 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TicketStatusChart({ data }) {
  const [colors, setColors] = useState({});
  const [total, setTotal] = useState(0);

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

    // 전체 값 계산
    const totalTickets =
      (data["해야 할 일"] || 0) + (data["진행 중"] || 0) + (data["완료"] || 0);
    setTotal(totalTickets);
  }, [data]);

  if (!colors.todo) return null; // 색상이 준비되지 않았으면 차트를 렌더링하지 않음

  const task = [
    {
      label: "해야 할 일",
      value: data["해야 할 일"] || 0,
      color: colors.todo,
      icon: Square,
    },
    {
      label: "진행 중",
      value: data["진행 중"] || 0,
      color: colors.inProgress,
      icon: Square,
    },
    {
      label: "완료",
      value: data["완료"] || 0,
      color: colors.done,
      icon: Square,
    },
  ];

  // 차트 데이터
  const chartData = {
    labels: ["해야 할 일", "진행 중", "완료"],
    datasets: [
      {
        data: task.map((item) => item.value), // 각 상태의 값
        backgroundColor: task.map((item) => item.color), // 각 상태의 색상
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
    maintainAspectRatio: true,
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <HStack gap="12">
        <Flex height="full">
          <Doughnut data={chartData} options={options} />
        </Flex>
        <Stack gap="4">
          {task.map((item) => (
            <HStack key={item.label} minWidth="40" justify="space-between">
              <HStack gap="2" align="center">
                <Icon>
                  <Box
                    rounded="sm"
                    bg={item.color}
                    width="16px"
                    height="16px"
                  />
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
              {total}
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </AspectRatio>
  );
}
