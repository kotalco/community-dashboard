import { useMemo } from 'react';

import useRequest from './useRequest';
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { formatSecretOptions } from '@utils/helpers/secrets';

export const useSecretTypes = (type: KubernetesSecretTypes) => {
  const { data, error, ...rest } = useRequest<KubernetesSecret[]>({
    url: `/core/secrets?type=${type}`,
  });

  const options = useMemo(() => formatSecretOptions(data), [data]);

  return { data: options, isLoading: !data && !error, ...rest };
};
