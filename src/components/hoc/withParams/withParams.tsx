import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Error from '@components/templates/Error/Error';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import useRequest from '@hooks/useRequest';
import { PageWithParams } from '@interfaces/PageWithParams';

interface Config {
  params: string;
  url: string;
}

export default function withParams<T>(
  Component: NextPage<PageWithParams<T>>,
  config: Config
) {
  const WithWrapper: NextPage = (props) => {
    const router = useRouter();
    const { params, url } = config;
    const param = router.query[params];
    const { data, error, mutate } = useRequest<T>(
      typeof param === 'string' ? { url: `${url}/${param}` } : null
    );

    if (error)
      return (
        <Error
          statusCode={error.response?.status}
          statusText={error.response?.statusText}
          message={error.response?.data.message}
        />
      );

    if (!data) return <LoadingIndicator />;

    return <Component {...props} data={data} mutate={mutate} />;
  };

  return WithWrapper;
}
