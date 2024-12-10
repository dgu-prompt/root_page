import ControlView from "./control-view";
import Pagination from "./pagination";

export default async function ControlsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { searchQuery, severity, controlStatus, complianceStatus, page } =
    await searchParams;
  // searchParams에서 값 추출

  const filters = {
    searchQuery: searchQuery || "",
    severity: severity ? (severity as string).toUpperCase() : null,
    controlStatus: controlStatus
      ? (controlStatus as string).toUpperCase()
      : null,
    complianceStatus: complianceStatus
      ? (complianceStatus as string).toUpperCase()
      : null,
  };
  const pageInt = parseInt((page as string) || "1", 10);
  const pageSize = 15; // 기본 페이지 크기

  try {
    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (filters.searchQuery)
      params.append("searchKeyword", filters.searchQuery);
    if (filters.severity) params.append("filter[severity]", filters.severity);
    if (filters.controlStatus)
      params.append("filter[status]", filters.controlStatus);
    if (filters.complianceStatus)
      params.append("complianceStatus", filters.complianceStatus);
    params.append("page", String(pageInt));
    params.append("pageSize", String(pageSize));

    const response = await fetch(
      `${process.env.API_HOST}/controlss?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // 캐싱과 재검증 설정
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error:", errorText);
      throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
    }

    const { controls, totalCount } = await response.json();

    return (
      <>
        <ControlView controls={controls} isGridView={true} />
        <Pagination
          totalCount={totalCount}
          currentPage={pageInt}
          pageSize={15}
        />
      </>
    );
  } catch (error: unknown) {
    console.error("Error fetching controls:", error);

    return (
      <div>
        <p style={{ color: "red" }}>
          {error instanceof Error
            ? error.message
            : "알 수 없는 에러가 발생했습니다."}
        </p>
      </div>
    );
  }
}
