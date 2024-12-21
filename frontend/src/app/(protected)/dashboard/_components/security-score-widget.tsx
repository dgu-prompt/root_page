"use client";

import type { SecurityScore } from "dashboard";
import { useEffect, useState } from "react";
// import { useRegion } from "../../_contexts/region-context";
import WidgetLg from "./widget-lg";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "@/components/ui/stat";

export default function SecurityScoreWidget() {
  // const { region } = useRegion();
  const [data, setData] = useState<SecurityScore>({
    score: 0,
    passed: 0,
    total: 0,
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
      console.log(controlData);
      setData({
        total: controlData.control_status_counts.enabled_count,
        passed: controlData.control_status_counts.passed_count,
        score: parseInt(
          (
            (100 * controlData.control_status_counts.passed_count) /
            controlData.control_status_counts.enabled_count
          ).toFixed(0)
        ),
      });
    }
    fetchData();
  }, []);

  return (
    <WidgetLg
      title="보안 점수"
      description="현재 보안 점수는 활성화된 제어 중 통과된 항목의 비율로 계산됩니다. 평가 대상이 아닌 항목은 점수 계산에서 제외됩니다."
    >
      <StatRoot size={{ base: "md", md: "lg" }}>
        <StatLabel>AWS에서 평가한</StatLabel>
        <StatValueText>{data.score}%</StatValueText>
        <StatHelpText>
          {data.passed} / {data.total} 제어 통과
        </StatHelpText>
      </StatRoot>
    </WidgetLg>
  );
}
