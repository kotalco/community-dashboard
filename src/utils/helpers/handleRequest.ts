import { handleAxiosError } from '@utils/axios';
import axios from 'axios';

export const handleRequest = async <T, K = never>(
  callback: (args?: K) => Promise<T>
) => {
  let response: T | undefined = undefined;
  let error: string | undefined = undefined;

  try {
    response = await callback();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = handleAxiosError(e);
    }
  }

  return { response, error };
};
