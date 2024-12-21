"use client";

import React, { useEffect, useState } from "react";
import WidgetLg from "./widget-lg";
import UnresolvedTicketsByPriorityChart from "./unresolved-tickets-by-priority-chart";
import TicketStatusChart from "./ticket-status-chart";

export default function TicketStatusWidget() {
  const [data, setData] = useState({});

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
      console.log("priorty_distribution", data.status_distribution);

      setData(data.status_distribution);
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="상태별 티켓"
      description="티켓 상태에 따른 개수를 나타냅니다."
    >
      <TicketStatusChart data={data} />
    </WidgetLg>
  );
}
