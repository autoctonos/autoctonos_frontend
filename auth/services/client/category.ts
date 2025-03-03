import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND; 

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useFetchData(endpoint) {
  const url = `${API_BASE_URL}/${endpoint}/`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
