export async function fetchAvailableRegions(): Promise<string[]> {
  return mockFetchAvailableRegions();
}

async function mockFetchAvailableRegions(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockAvailableRegions), 200)
  );
}

const mockAvailableRegions = [
  "us-east-1",
  "us-west-1",
  "ap-northeast-2",
  "eu-central-1",
];
