import { ControlWithStatus } from "@features/controls/types/typesV2";
import { mockControlWithStatus } from "../data/mockControlWithStatus";

export default async function fetchControlWithStatus(
  controlIds: string[]
): Promise<ControlWithStatus[]> {
  return mockFetchControlWithStatus(controlIds);
}

async function mockFetchControlWithStatus(
  controlIds: string[]
): Promise<ControlWithStatus[]> {
  await new Promise((c) => setTimeout(c, 500));
  return mockControlWithStatus.filter((c) => controlIds.includes(c.controlId));
}
