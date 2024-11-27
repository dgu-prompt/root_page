export async function fetchRegionRuleCount(region: string): Promise<number> {
  return mockFetchRegionRuleCount(region);
}

async function mockFetchRegionRuleCount(region: string): Promise<number> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockRegionalRuleCount[region]), 200)
  );
}

const mockRegionalRuleCount: { [region: string]: number } = {
  "us-east-1": 1,
  "us-west-1": 2,
  "ap-northeast-2": 3,
  "eu-central-1": 0,
};
