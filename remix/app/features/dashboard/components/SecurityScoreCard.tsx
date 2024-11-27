import useFetchMock from "@/hooks/useFetchMock";
import DashboardCard from "./DashboardCard";
import {
  StatRoot,
  StatLabel,
  StatValueText,
  StatHelpText,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useRegion } from "../../../shared/contexts/RegionContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface SecurityScore {
  score: number;
  passed: number;
  total: number;
}

export default function SecurityScoreCard() {
  const { region } = useRegion();
  const { data, loading, error } = useFetchMock<SecurityScore>(
    mockFetchSecurityScore,
    region
  );

  function handleRetry() {
    // 구현 필요
    console.log("Retrying fetch for security score");
  }

  return (
    <DashboardCard
      title="보안 점수"
      description="현재 보안 점수는 활성화된 제어 중 통과된 항목의 비율로 계산됩니다. 평가 대상이 아닌 항목은 점수 계산에서 제외됩니다."
    >
      {loading && <LoadingStat />}
      {error instanceof Error && (
        <ErrorStat onClick={handleRetry} error={error} />
      )}
      {data && (
        <SecurityScoreStat
          score={data.score}
          passed={data.passed}
          total={data.total}
        />
      )}
    </DashboardCard>
  );
}

function LoadingStat() {
  return (
    <Skeleton>
      <StatRoot size={{ base: "md", md: "lg" }}>
        <StatLabel>AWS에서 평가한</StatLabel>
        <StatValueText>0%</StatValueText>
        <StatHelpText>0 / 0 제어 통과</StatHelpText>
      </StatRoot>
    </Skeleton>
  );
}

function ErrorStat({ onClick, error }: { onClick: () => void; error: Error }) {
  return (
    <Stack>
      <Text>에러가 발생했습니다.</Text>
      <Text>{error.message}</Text>
      <Button variant="outline" onClick={onClick}>
        재시도
      </Button>
    </Stack>
  );
}

function SecurityScoreStat({ score, passed, total }: SecurityScore) {
  return (
    <StatRoot size={{ base: "md", md: "lg" }}>
      <StatLabel>AWS에서 평가한</StatLabel>
      <StatValueText>{score}%</StatValueText>
      <StatHelpText>
        {passed} / {total} 제어 통과
      </StatHelpText>
    </StatRoot>
  );
}

interface RegionData {
  [key: string]: SecurityScore;
}

function mockFetchSecurityScore(region: string): Promise<SecurityScore> {
  const mockData: RegionData = {
    "us-east-1": { score: 90, passed: 200, total: 222 },
    "ap-northeast-2": { score: 75, passed: 198, total: 263 },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = mockData[region];
      if (data) {
        resolve(data); // 데이터가 존재하면 resolve
      } else {
        reject(new Error(`Region data not found for: ${region}`)); // 데이터가 없으면 reject
      }
    }, 500);
  });
}
