"use client";

import { useEffect, useState } from "react";
import WidgetLg from "./widget-lg";
import ControlTypeChart from "./control-type-chart";

export default function ControlTypeWidget() {
  const [data, setData] = useState({
    EC2: 0,
    IAM: 0,
    RDS: 0,
    S3: 0,
    SSM: 0,
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
      const analyzedIssues = controlData.analyzed_issues || {};

      // control_type_distribution 데이터 가져오기
      const controlTypeDistribution =
        analyzedIssues.control_type_distribution || {};
      setData({
        EC2: controlTypeDistribution.EC2 || 0,
        IAM: controlTypeDistribution.IAM || 0,
        RDS: controlTypeDistribution.RDS || 0,
        S3: controlTypeDistribution.S3 || 0,
        SSM: controlTypeDistribution.SSM || 0,
      });
    }

    fetchData();
  }, []);

  return (
    <WidgetLg
      title="제어 타입별 분포"
      description="Security Hub의 제어 항목은 EC2, IAM, RDS와 같은 AWS 서비스별로 나뉩니다. 각 제어 항목의 분포를 확인하세요."
    >
      <ControlTypeChart data={data} />
    </WidgetLg>
  );
}
