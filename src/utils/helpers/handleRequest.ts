import axios from 'axios';

import { APIError } from '@interfaces/api/APIError';

export const handleRequest = async <T, K = never>(
  callback: (args?: K) => Promise<T>,
  setError?: (
    fieldname: keyof K,
    error: { type: string; message: string }
  ) => void
) => {
  let response: T | undefined = undefined;
  let error: APIError | undefined = undefined;

  try {
    response = await callback();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e.response?.data as APIError;

      if (setError) {
        setError(`api` as keyof K, {
          type: 'server',
          message: error.message,
        });

        error.validations?.forEach((fieldError) => {
          setError(Object.keys(fieldError)[0] as keyof K, {
            type: 'validation',
            message: fieldError[Object.keys(fieldError)[0]],
          });
        });
      }
    }
  }

  return { response, error };
};
