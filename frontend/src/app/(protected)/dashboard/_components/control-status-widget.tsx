import WidgetLg from "./widget-lg";
// import StackedBarChart from "./stacked-bar-chart2";
import ControlStatusChart from "./control-status-chart";

export default function ControlStatusWidget() {
  return (
    <WidgetLg
      title="제어 상태"
      description="Security Hub는 지난 24시간 동안의 제어 조사 결과를 바탕으로 제어 상태를 결정합니다. 각 상태는 규정 준수 여부를 통해 제어의 성능을 요약합니다."
    >
      {/* <Skeleton> */}
      {/* <StackedBarChart width={500} height={100} />
       */}
      <ControlStatusChart />
      {/* </Skeleton> */}
    </WidgetLg>
  );
}
