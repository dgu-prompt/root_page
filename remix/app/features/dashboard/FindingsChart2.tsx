import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FindingsChart() {
  const data = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        label: "Findings",
        data: [123, 155, 583, 83],
        backgroundColor: ["#800080", "#FF0000", "#FFA500", "#FFFF00"],
        // borderColor: ["#5A005A", "#B20000", "#B27300", "#B2B200"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Findings by Severity",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
