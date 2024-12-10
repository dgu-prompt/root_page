"use client";

import type { SecurityScore } from "dashboard";
import { useEffect } from "react";
import { useRegion } from "../../_contexts/region-context";
import WidgetLg from "./widget-lg";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "@/components/ui/stat";

export default function SecurityScoreWidget() {
  const { region } = useRegion();
  const data: SecurityScore = { score: 75, passed: 198, total: 263 };

  useEffect(() => {});

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
