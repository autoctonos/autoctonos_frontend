import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetchDataById(endpoint: string, id: number) {
  const url = id ? `${API_BASE_URL}/${endpoint}?id_usuario=${id}` : null;
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error && !!url,
  };
}
