import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.response.use(function (
  response: AxiosResponse<{ data: unknown }>
) {
  if (response.config.method !== 'get') {
    return response.data.data;
  }
  return response;
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);

  return response.data;
}
