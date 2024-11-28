import { ControlFull, Severity } from "@features/controls/types/typesV2";
import { mockControlFull } from "../data/mockControlFull";

export interface ControlFilters {
  searchQuery?: string;
  severity?: Severity | null;
  controlStatus?: "enabled" | "disabled" | null;
  complianceStatus?:
    | "passed"
    | "failed"
    | "no_data"
    | "unknown"
    | "disabled"
    | null;
}

interface FetchControlPayload {
  region: string;
  filters?: ControlFilters;
  page?: number;
  pageSize?: number;
}

function mockApplyFilters(
  items: ControlFull[],
  filters: ControlFilters
): ControlFull[] {
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
    )
    .filter((item) =>
      filters.complianceStatus
        ? item.complianceStatus === filters.complianceStatus
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

async function mockFetchAllControlFull({
  region,
  filters,
  page,
  pageSize,
}: FetchControlPayload): Promise<{
  controls: ControlFull[];
  totalCounts: number;
}> {
  await new Promise((c) => setTimeout(c, 500));

  const allControls = mockControlFull;
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

export async function fetchAllControlFull({
  region,
  filters,
  page,
  pageSize,
}: FetchControlPayload): Promise<{
  controls: ControlFull[];
  totalCounts: number;
}> {
  return mockFetchAllControlFull({ region, filters, page, pageSize });
}
