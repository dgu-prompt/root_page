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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UnresolvedTicketsByPriorityChart({ data = {} }) {
  const [colors, setColors] = useState({});

  useEffect(() => {
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

  if (!colors.highest) return null;

  const priorities = [
    {
      label: "Highest",
      key: "Highest",
      color: colors.highest,
      icon: ChevronsUp,
    },
    { label: "High", key: "High", color: colors.high, icon: ChevronUp },
    { label: "Medium", key: "Medium", color: colors.medium, icon: Equal },
    { label: "Low", key: "Low", color: colors.low, icon: ChevronDown },
    {
      label: "Lowest",
      key: "Lowest",
      color: colors.lowest,
      icon: ChevronsDown,
    },
  ];

  const chartData = {
    labels: ["우선순위"],
    datasets: priorities.map((priority) => ({
      label: priority.label,
      data: [data[priority.key] || 0],
      backgroundColor: priority.color,
    })),
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        grid: { display: true },
        ticks: { stepSize: 5 },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <VStack gap="4">
        <Flex width="full" flexGrow={1}>
          <Bar data={chartData} options={options} />
        </Flex>
        <HStack gap="4">
          {priorities.map((priority) => (
            <HStack key={priority.label} gap="2">
              <Icon color={priority.color}>
                <priority.icon />
              </Icon>
              <Text fontSize="sm" color="fg.muted">
                {priority.label}: {data[priority.key] || 0}
              </Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </AspectRatio>
  );
}
