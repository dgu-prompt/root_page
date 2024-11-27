import { ControlWithStatus, Severity } from "@features/controls/types/typesV2";
import { mockControlWithStatus } from "../data/mockControlWithStatus";

interface ControlFilters {
  searchQuery?: string;
  severity?: Severity | null;
  controlStatus?: "enabled" | "disabled" | null;
}

interface FetchControlPayload {
  region: string;
  filters?: ControlFilters;
  page?: number;
  pageSize?: number;
}

function mockApplyFilters(
  items: ControlWithStatus[],
  filters: ControlFilters
): ControlWithStatus[] {
  return items
    .filter((item) =>
      filters.searchQuery
        ? item.controlId
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true
    )
    .filter((item) =>
      filters.severity ? item.severity === filters.severity : true
    )
    .filter((item) =>
      filters.controlStatus
        ? item.controlStatus === filters.controlStatus
        : true
    );
}

function mockApplyPagination<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

async function mockFetchAllControlWithStatus({
  region,
  filters,
  page,
  pageSize,
}: FetchControlPayload): Promise<{
  controls: ControlWithStatus[];
  totalCounts: number;
}> {
  await new Promise((c) => setTimeout(c, 500));

  const allControls = mockControlWithStatus;
  const filteredControls = mockApplyFilters(allControls, filters || {});
  const paginatedControls = mockApplyPagination(
    filteredControls,
    page || 1,
    pageSize || 15
  );
  console.log(paginatedControls);
  console.log(paginatedControls.length);

  return { controls: paginatedControls, totalCounts: filteredControls.length };
}

export async function fetchAllControlWithStatus({
  region,
  filters,
  page,
  pageSize,
}: FetchControlPayload): Promise<{
  controls: ControlWithStatus[];
  totalCounts: number;
}> {
  return mockFetchAllControlWithStatus({ region, filters, page, pageSize });
}
