import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await instance.get<T>(url);

  return response.data;
}

export function handleAxiosError<T>(e: AxiosError) {
  return e as AxiosError<T>;
}

export default instance;
