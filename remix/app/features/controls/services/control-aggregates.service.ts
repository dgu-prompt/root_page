import { toaster } from "@/components/ui/toaster";

import { mockSecurityControlJiraAssigneeDetailByRegion } from "../data/mock-regional-control-compliance-result";
import type {
  ComplianceStatus,
  ControlAggregate,
  Severity,
} from "../types/controls-types";

type FetchControlAggregatePayload = {
  region: string;
  filters?: {
    searchQuery?: string;
    hasJiraAssignee?: boolean | null;
    severity?: Severity | null;
    complianceStatus?: ComplianceStatus | null;
  };
  page?: number;
  pageSize?: number;
};

type FetchControlAggregateOk = {
  ok: true;
  controls: ControlAggregate[];
  totalCount: number;
};

type FetchControlAggregateError = {
  ok: false;
  errorMessage: string;
};

type FetchControlAggregateResponse =
  | FetchControlAggregateOk
  | FetchControlAggregateError;

const applyFilters = (
  items: ControlAggregate[],
  filters: {
    searchQuery?: string;
    hasJiraAssignee?: boolean | null;
    severity?: Severity | null;
    complianceStatus?: ComplianceStatus | null;
  }
): ControlAggregate[] => {
  return items
    .filter((item) =>
      filters.searchQuery
        ? item["controlId"]
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true
    )
    .filter((item) =>
      filters.hasJiraAssignee
        ? filters.hasJiraAssignee === true
          ? item["jiraAssigneeId"]
          : !item["jiraAssigneeId"]
        : true
    )
    .filter((item) =>
      filters.severity ? item["severity"] === filters.severity : true
    )
    .filter((item) =>
      filters.complianceStatus
        ? item["complianceStatus"] === filters.complianceStatus
        : true
    );
};

const applyPagination = <T>(
  items: T[],
  page: number,
  pageSize: number
): T[] => {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

const mockFetchControlAggregateOk = async (
  request: FetchControlAggregatePayload
): Promise<FetchControlAggregateOk> => {
  const allControls =
    mockSecurityControlJiraAssigneeDetailByRegion[request.region] || [];
  const filteredControls = applyFilters(allControls, request.filters || {});
  const paginatedControls = applyPagination(
    filteredControls,
    request.page || 1,
    request.pageSize || 15
  );

  return new Promise((resolve) =>
    setTimeout(resolve, 500, {
      ok: true,
      controls: paginatedControls,
      totalCount: filteredControls.length,
    })
  );
};

const mockFetchControlAggregateError =
  async (): Promise<FetchControlAggregateError> => {
    const mockFetchControlAggregateError: FetchControlAggregateError = {
      ok: false,
      errorMessage: "Failed to fetch control aggregate",
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      throw new Error(mockFetchControlAggregateError.errorMessage);
    } catch (error) {
      toaster.create({
        title: "Error",
        type: "error",
        description: (error as Error).message || "Unknown error occurred",
      });
      throw mockFetchControlAggregateError;
    }
  };

const mockFetchControlAggregate = async (
  request: FetchControlAggregatePayload
): Promise<FetchControlAggregateResponse> => {
  if (Math.random() < 0.001) {
    return mockFetchControlAggregateError();
  } else {
    return mockFetchControlAggregateOk(request);
  }
};

export const fetchControlAggregate = async (
  request: FetchControlAggregatePayload
): Promise<FetchControlAggregateResponse> => {
  return mockFetchControlAggregate(request);
};
