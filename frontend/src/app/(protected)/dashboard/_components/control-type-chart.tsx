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
import { AspectRatio, Box } from "@chakra-ui/react";

// Chart.js 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopControlTypeChart({ data }) {
  const [colors, setColors] = useState([]);
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    const dynamicColors = [
      rootStyles.getPropertyValue("--chakra-colors-blue-emphasized").trim(),
      rootStyles.getPropertyValue("--chakra-colors-orange-emphasized").trim(),
      rootStyles.getPropertyValue("--chakra-colors-green-emphasized").trim(),
      rootStyles.getPropertyValue("--chakra-colors-purple-emphasized").trim(),
      rootStyles.getPropertyValue("--chakra-colors-teal-emphasized").trim(),
    ];
    setColors(dynamicColors);

    // 상위 5개의 데이터를 정렬 후 가져오기
    const sortedData = Object.entries(data)
      .sort(([, a], [, b]) => b - a) // 값 기준 내림차순 정렬
      .slice(0, 5); // 상위 5개 가져오기

    setLabels(sortedData.map(([key]) => key)); // 레이블 생성
    setChartData(sortedData.map(([, value]) => value)); // 데이터 생성
  }, [data]);

  if (!labels.length || !chartData.length) return null; // 데이터가 준비되지 않으면 렌더링하지 않음

  const chartConfig = {
    labels: labels, // 동적으로 생성된 레이블
    datasets: [
      {
        label: "제어 타입",
        data: chartData, // 상위 5개의 데이터
        backgroundColor: colors.slice(0, labels.length), // 필요한 색상만 사용
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // 수평 막대형 차트 설정
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Control Count",
        },
      },
      y: {
        title: {
          display: false,
          text: "Control Type",
        },
      },
    },
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <Box width="100%">
        <Bar data={chartConfig} options={options} />
      </Box>
    </AspectRatio>
  );
}
