import React from "react";
import { Group } from "@visx/group";
import { BarStackHorizontal } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Box } from "@chakra-ui/react";

// 데이터 정의
const complianceStatus = [
  { label: "통과", value: 198, color: "#38A169" },
  { label: "실패", value: 65, color: "#E53E3E" },
  { label: "데이터 없음", value: 30, color: "#3182CE" },
  { label: "알 수 없음", value: 0, color: "#D69E2E" },
  { label: "비활성화됨", value: 149, color: "#718096" },
];

// 스케일 정의
const xScale = scaleLinear<number>({
  domain: [0, complianceStatus.reduce((sum, d) => sum + d.value, 0)],
  nice: true,
});

const yScale = scaleBand<string>({
  domain: ["결과"],
  padding: 0.2,
});

// // 색상 스케일
// const colorScale = scaleOrdinal<string, string>({
//   domain: complianceStatus.map((d) => d.label),
//   range: complianceStatus.map((d) => d.color),
// });

const margin = { top: 20, left: 100, right: 20, bottom: 40 };

const StackedBarChartHorizontal = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <Box position="relative">
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={[
              complianceStatus.reduce(
                (acc, curr) => ({ ...acc, [curr.label]: curr.value }),
                {}
              ),
            ]}
            keys={complianceStatus.map((d) => d.label)}
            height={yMax}
            y={() => "결과"}
            xScale={xScale}
            yScale={yScale}
            color={(key) =>
              complianceStatus.find((d) => d.label === key)?.color || "black"
            }
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4} // 막대의 모서리 둥글게
                  />
                ))
              )
            }
          </BarStackHorizontal>
        </Group>
      </svg>
    </Box>
  );
};

export default StackedBarChartHorizontal;
