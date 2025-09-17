import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error al obtener datos");
    return res.json();
  });

export function useFetchData(endpoint: string, params?: Record<string, any>) {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [key, val]) => {
          if (val !== undefined && val !== "") acc[key] = String(val);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  const url = `${API_BASE_URL}/${endpoint}/${query}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
