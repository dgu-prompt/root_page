import { useState, useEffect } from "react";

type FetchFunction<T> = (region: string) => Promise<T>; // region을 인자로 받는 함수 타입

export default function useFetchMock<T>(
  fetchFunction: FetchFunction<T>,
  region: string // region을 인자로 받음
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const result: T = await fetchFunction(region); // fetchFunction에 region 전달
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchFunction, region]); // region이 변경될 때마다 재호출

  return { data, loading, error };
}
