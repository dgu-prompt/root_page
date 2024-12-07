import { ControlFull, Severity } from "@features/controls/types/typesV2";
// import { mockControlFull } from "../data/mockControlFull";

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

// function mockApplyFilters(
//   items: ControlFull[],
//   filters: ControlFilters
// ): ControlFull[] {
//   return items
//     .filter((item) =>
//       filters.searchQuery
//         ? item.controlId
//             .toLowerCase()
//             .includes(filters.searchQuery.toLowerCase())
//         : true
//     )
//     .filter((item) =>
//       filters.severity ? item.severity === filters.severity : true
//     )
//     .filter((item) =>
//       filters.controlStatus
//         ? item.controlStatus === filters.controlStatus
//         : true
//     )
//     .filter((item) =>
//       filters.complianceStatus
//         ? item.complianceStatus === filters.complianceStatus
//         : true
//     );
// }

// function mockApplyPagination<T>(
//   items: T[],
//   page: number,
//   pageSize: number
// ): T[] {
//   const startIndex = (page - 1) * pageSize;
//   return items.slice(startIndex, startIndex + pageSize);
// }

// async function mockFetchAllControlFull({
//   region,
//   filters,
//   page,
//   pageSize,
// }: FetchControlPayload): Promise<{
//   controls: ControlFull[];
//   totalCounts: number;
// }> {
//   await new Promise((c) => setTimeout(c, 500));

//   const allControls = mockControlFull;
//   const filteredControls = mockApplyFilters(allControls, filters || {});
//   const paginatedControls = mockApplyPagination(
//     filteredControls,
//     page || 1,
//     pageSize || 15
//   );
//   console.log(paginatedControls);
//   console.log(paginatedControls.length);

//   return { controls: paginatedControls, totalCounts: filteredControls.length };
// }

export async function fetchAllControlFull({
  region,
  filters,
  page,
  pageSize,
}: FetchControlPayload): Promise<{
  controls: ControlFull[];
  totalCounts: number;
}> {
  const queryParams = new URLSearchParams();

  if (filters?.searchQuery)
    queryParams.append("searchKeyword", filters.searchQuery);
  if (filters?.severity)
    queryParams.append("filter[severity]", filters.severity);
  if (filters?.controlStatus)
    queryParams.append("filter[status]", filters.controlStatus);
  if (filters?.complianceStatus)
    queryParams.append("filter[complianceStatus]", filters.complianceStatus);
  if (page) queryParams.append("page", String(page));
  if (pageSize) queryParams.append("pageSize", String(pageSize));

  const apiUrl = process.env.API_URL;
  const requestUrl = `${apiUrl}/control?${queryParams.toString()}`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to fetch controls.");
    }

    const data = await response.json();

    return {
      controls: data.controls || [],
      totalCounts: data.totalCount || 0,
    };
  } catch (error) {
    console.error("Error fetching controls:", error);
    throw error;
  }
}
