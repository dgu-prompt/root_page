"use client";

import { useEffect, useState } from "react";
import WidgetLg from "./widget-lg";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import SeverityBadge from "../../_components/severity-badge";

export default function FailedChecksBySeverityWidget() {
  const [severityData, setSeverityData] = useState({
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
    INFORMATIONAL: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
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
          throw new Error(
            `서버 에러: ${response.status} ${response.statusText}`
          );
        }

        const controlData = await response.json();
        console.log("FailedChecksBySeverityWidget", controlData);

        // severity_distribution에서 데이터 추출
        const analyzedIssues = controlData.analyzed_issues || {};
        const severityDistribution = analyzedIssues.severity_distribution || {};
        setSeverityData({
          CRITICAL: severityDistribution.CRITICAL || 0,
          HIGH: severityDistribution.HIGH || 0,
          MEDIUM: severityDistribution.MEDIUM || 0,
          LOW: severityDistribution.LOW || 0,
          INFORMATIONAL: severityDistribution.INFORMATIONAL || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="심각도별 실패한 검사"
      description="심각도는 위협 행위자의 악용 가능성과 사용자의 AWS 환경에 미치는 영향을 바탕으로 Security Hub가 할당한 중요도입니다."
    >
      <DataListRoot orientation="horizontal" size={{ base: "md", md: "lg" }}>
        <DataListItem
          grow
          key="Critical"
          label={<SeverityBadge severity="critical" />}
          value={severityData.CRITICAL}
        />
        <DataListItem
          grow
          key="High"
          label={<SeverityBadge severity="high" />}
          value={severityData.HIGH}
        />
        <DataListItem
          grow
          key="Medium"
          label={<SeverityBadge severity="medium" />}
          value={severityData.MEDIUM}
        />
        <DataListItem
          grow
          key="Low"
          label={<SeverityBadge severity="low" />}
          value={severityData.LOW}
        />
      </DataListRoot>
    </WidgetLg>
  );
}
