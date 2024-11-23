import { Container } from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

import Pagination from "@/components/pagination";
import { useIsClient } from "@/hooks/useIsClient";
import ControlHeader from "@features/controls/components/control-header";
import ControlView from "@features/controls/components/control-view";
import { ToggleControlStatusProvider } from "@features/controls/contexts/toggle-control-status-context";
import { fetchControlAggregate } from "@features/controls/services/control-aggregates.service";
import { toggleControlStatus } from "@features/controls/services/control-status.service";
import {
  ComplianceStatus,
  Severity,
} from "@features/controls/types/controls-types";

type FilterState = {
  searchQuery?: string;
  hasJiraAssignee?: boolean | null;
  severity?: Severity | null;
  complianceStatus?: ComplianceStatus | null;
};

// Loader function to fetch controls data
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Extract query parameters
  const region = url.searchParams.get("region") || "ap-northeast-2";
  const searchQuery = url.searchParams.get("q") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "15", 10);

  try {
    const response = await fetchControlAggregate({
      region,
      filters: {}, // 필터는 상태에서 관리
      page,
      pageSize,
    });

    if (!response.ok) {
      throw new Error(response.errorMessage || "Failed to fetch controls");
    }

    const { controls, totalCount } = response;

    return json({
      controls,
      totalCount,
      searchQuery,
      region,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Loader error:", error);
    throw json(
      { errorMessage: "Failed to load controls data." },
      { status: 500 }
    );
  }
};

export const ControlsPage = () => {
  const loaderData = useLoaderData<typeof loader>();

  const {
    controls: initialControls = [],
    searchQuery = "",
    region = "ap-northeast-2",
    totalCount: initialTotalCount = 0,
    page = 1,
    pageSize = 15,
  } = loaderData || {};

  const [controls, setControls] = useState(initialControls);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [isGridView, setIsGridView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: searchQuery || "",
    hasJiraAssignee: null,
    severity: null,
    complianceStatus: null,
  });

  const navigation = useNavigation();
  const isClient = useIsClient();
  const submit = useSubmit();

  const isSearching: boolean =
    !!navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const handleRegionChange = (newRegion: string) => {
    const formData = new FormData();
    formData.append("q", filterState.searchQuery || "");
    formData.append("page", "1");
    formData.append("pageSize", (pageSize ?? 15).toString());
    formData.append("region", newRegion);
    submit(formData);
  };

  // 필터 변경 핸들러
  const handleFilterChange = ({
    type,
    value,
  }: {
    type: keyof FilterState;
    value: string | null;
  }) => {
    const formData = new FormData();
    formData.append("q", filterState.searchQuery || "");
    formData.append("page", "1");
    formData.append("pageSize", (pageSize ?? 15).toString());
    submit(formData);

    setFilterState((prev) => {
      const updatedState = {
        ...prev,
        [type]: prev[type] === value ? null : value, // 같으면 null로 초기화
      };
      console.log("Updated Filter State:", updatedState);
      return updatedState;
    });
  };

  // 필터 상태 변화 감지 및 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      try {
        const response = await fetchControlAggregate({
          region: "ap-northeast-2",
          filters: filterState,
          page: 1,
          pageSize: 15,
        });

        if (response.ok) {
          const { controls, totalCount } = response;
          setControls(controls);
          setTotalCount(totalCount);
        } else {
          const { errorMessage } = response;
          console.error("Failed to fetch controls:", errorMessage);
        }
      } catch (error) {
        console.error("Unexpected error occurred:", error);
      }
      // setIsLoading(false);
    };

    fetchData();
  }, [filterState]); // filterState가 변경될 때마다 호출

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setFilterState((prev) => ({ ...prev, query: newQuery }));
    submit({ q: newQuery }); // 검색어만 쿼리 파라미터로 업데이트
  };

  const handlePageChange = (details: { page: number }) => {
    const formData = new FormData();
    formData.append("q", filterState.searchQuery || "");
    formData.append("page", details.page.toString());
    formData.append("pageSize", (pageSize ?? 15).toString());
    submit(formData);
  };

  // 모바일 화면 감지
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileSize);

      if (isMobileSize) {
        setIsGridView(true); // 모바일일 때 무조건 GridView
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container pt={{ base: "6", md: "8", lg: "10" }}>
      <ControlHeader
        filterState={filterState}
        handleSearchChange={handleSearchChange}
        handleRegionChange={handleRegionChange}
        isGridView={isGridView}
        isSearching={isSearching}
        onFilterChange={handleFilterChange}
        region={region}
        setIsGridView={!isMobile ? setIsGridView : () => {}}
      />

      <ToggleControlStatusProvider toggleControlStatus={toggleControlStatus}>
        <ControlView
          controls={controls ?? []}
          isGridView={isGridView}
          isSearching={isSearching}
          query={filterState.searchQuery || ""}
        />
      </ToggleControlStatusProvider>

      <Pagination
        currentPage={page ?? 1}
        onPageChange={handlePageChange}
        pageSize={pageSize ?? 15}
        totalCount={totalCount ?? 0}
      />
    </Container>
  );
};

export default ControlsPage;
