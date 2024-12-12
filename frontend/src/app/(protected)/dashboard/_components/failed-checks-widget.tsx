"use client";

import type { FailedChecks } from "dashboard";
import { useEffect, useState } from "react";
// import { useRegion } from "../../_contexts/region-context";
import WidgetLg from "./widget-lg";
import { StatRoot, StatValueText, StatValueUnit } from "@/components/ui/stat";

export default function FailedChecksWidget() {
  const [data, setData] = useState<FailedChecks>({
    failed: 0,
    total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/dashboard/findings`,
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
        failed: enabledCount + disabledCount - passedCount,
        total: enabledCount + disabledCount,
      });
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="실패한 검사"
      description="실패한 검사는 보안 검사의 결과로, Security Hub가 규정 준수 실패로 식별한 항목의 개수를 나타냅니다. 이는 AWS 환경에서 잠재적 취약성을 파악하는 데 사용됩니다."
    >
      <StatRoot size={{ base: "md", md: "lg" }}>
        <StatValueText alignItems="baseline">
          {data.failed} <StatValueUnit>/ {data.total}</StatValueUnit>
        </StatValueText>
      </StatRoot>
    </WidgetLg>
  );
}
