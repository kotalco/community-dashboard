import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);

  return response.data;
}

export function handleAxiosError<T extends { error: string }>(
  e: AxiosError<T>
) {
  return e.response?.data.error;
}

export default api;
