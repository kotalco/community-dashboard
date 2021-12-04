import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { Validator } from '@interfaces/ethereum2/Validator';

export const useValidator = (
  validatorName?: string,
  config?: SWRConfiguration
) => {
  const { data, error, ...rest } = useSWR<{ validator: Validator }, AxiosError>(
    !validatorName ? null : `/ethereum2/validators/${validatorName}`,
    config
  );
  const validator = data?.validator;
  const isLoading = !error && !data;

  return { validator, error, isLoading, ...rest };
};
