"use client";

import type { ControlStatus } from "dashboard";
import { useEffect, useState } from "react";
import WidgetLg from "./widget-lg";
// import StackedBarChart from "./stacked-bar-chart2";
import ControlStatusChart from "./control-status-chart";
import { FaOpencart } from "react-icons/fa";

export default function ControlStatusWidget() {
  const [data, setData] = useState<ControlStatus>({
    passed: 0,
    failed: 0,
    disabled: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/dashboard/findings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }, // 캐싱과 재검증 설정
          cache: "force-cache",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
      }

      const controlData = await response.json();

      const enabledCount = Number(
        controlData.control_status_counts?.enabled_count || 0
      );
      const disabledCount = Number(
        controlData.control_status_counts?.disabled_count || 0
      );
      const passedCount = Number(
        controlData.control_status_counts?.passed_count || 0
      );

      console.log("Fetched data:", {
        enabledCount,
        disabledCount,
        passedCount,
      });

      setData({
        passed: passedCount,
        failed: enabledCount - passedCount,
        disabled: disabledCount,
      });
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="제어 상태"
      description="Security Hub는 지난 24시간 동안의 제어 조사 결과를 바탕으로 제어 상태를 결정합니다. 각 상태는 규정 준수 여부를 통해 제어의 성능을 요약합니다."
    >
      {/* <Skeleton> */}
      {/* <StackedBarChart width={500} height={100} />
       */}
      <ControlStatusChart data={data} />
      {/* </Skeleton> */}
    </WidgetLg>
  );
}
