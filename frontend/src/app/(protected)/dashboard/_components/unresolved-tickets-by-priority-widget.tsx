"use client";

import React, { useEffect, useState } from "react";
import WidgetLg from "./widget-lg";
import UnresolvedTicketsByPriorityChart from "./unresolved-tickets-by-priority-chart";

export default function UnresolvedTicketsByPriorityWidget() {
  const [priorityData, setPriorityData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/dashboard`,
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

      const data = await response.json();
      console.log("priorty_distribution", data.priorty_distribution);

      setPriorityData(data.priority_distribution);
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="우선순위별 미해결 티켓"
      description="우선순위에 따른 미해결 티켓 수를 나타냅니다."
    >
      <UnresolvedTicketsByPriorityChart data={priorityData} />
    </WidgetLg>
  );
}
