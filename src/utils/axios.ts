import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await instance.get<T>(url);

  return response.data;
}

export async function fetchHeader(url: string) {
  const response = await instance.head(url);

  return response.headers as { 'x-total-count': string };
}

export function handleAxiosError<T>(e: AxiosError<T>) {
  return e;
}

export default instance;
