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

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
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
      { label: "Passed", data: [198], backgroundColor: colors.passed },
      { label: "Failed", data: [65], backgroundColor: colors.failed },
      { label: "No Data", data: [30], backgroundColor: colors.noData },
      { label: "Unknown", data: [0], backgroundColor: colors.unknown },
      { label: "Disabled", data: [149], backgroundColor: colors.disabled },
    ],
  };

  // 차트 옵션
  const options = {
    indexAxis: "y", // 가로형 막대 그래프
    plugins: {
      legend: {
        display: true,
        position: "bottom", // 범례 위치를 아래로 설정
        align: "start", // 범례 항목을 왼쪽 정렬
        labels: {
          generateLabels: (chart) => {
            // 기본 레이블을 가져와 숫자 추가
            const labels = chart.data.datasets.map((dataset, index) => {
              return {
                text: `${dataset.label}: ${dataset.data[0]}`, // 숫자 추가
                fillStyle: dataset.backgroundColor,
                hidden: chart.getDatasetMeta(index).hidden,
                datasetIndex: index,
              };
            });
            return labels;
          },
          boxWidth: 12,
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true, // 스택 설정
        display: false, // x축 숨기기
        ticks: { display: false },
        grid: { display: false }, // x축 격자 숨기기
      },
      y: {
        stacked: true, // 스택 설정
        display: false, // y축 숨기기
        ticks: { display: false },
        grid: { display: false }, // y축 격자 숨기기
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
    datasets: {
      bar: {
        barThickness: 28,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
