import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getValidator } from '@utils/requests/ethereum2/validators';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ValidatorProtocolTab from '@components/organisms/Ethereum2/Validator/ValidatorProtocolTab/ValidatorProtocolTab';
import ValidatorGraffitiTab from '@components/organisms/Ethereum2/Validator/ValidatorGarfittiTab/ValidatorGarfittiTab';
import ValidatorKeystoreTab from '@components/organisms/Ethereum2/Validator/ValidatorKeystoreTab/ValidatorKeystoreTab';
import ValidatorBeaconNodeTab from '@components/organisms/Ethereum2/Validator/ValidatorBeaconNodeTab/ValidatorBeaconNodeTab';
import ValidatorResourcesTab from '@components/organisms/Ethereum2/Validator/ValidatorResourcesTab/ValidatorResourcesTab';
import DeleteValidator from '@components/organisms/Ethereum2/Validator/DeleteValidator/DeleteValidator';
import { tabTitles } from '@data/ethereum2/validator/tabTitles';
import { Ethereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator';

interface Props {
  validator: Ethereum2Validator;
}

const ValidatorDetailsPage: React.FC<Props> = ({ validator }) => {
  const { isFallback, query } = useRouter();
  const { validatorName } = query;

  const { data } = useSWR(
    typeof validatorName === 'string' ? validatorName : null,
    getValidator,
    {
      initialData: validator,
      revalidateOnMount: true,
    }
  );

  if (!data || isFallback) return <LoadingIndicator />;
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">{validator.name}</h1>

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles}>
          <ValidatorProtocolTab client={data.client} network={data.network} />
          <ValidatorGraffitiTab name={data.name} graffiti={data.graffiti} />

          <ValidatorKeystoreTab
            name={data.name}
            keystores={data.keystores}
            walletPasswordSecretName={data.walletPasswordSecretName}
            client={data.client}
          />

          <ValidatorBeaconNodeTab
            name={data.name}
            beaconEndpoints={data.beaconEndpoints}
            client={data.client}
          />

          <ValidatorResourcesTab
            name={data.name}
            cpu={data.cpu}
            cpuLimit={data.cpuLimit}
            memory={data.memory}
            memoryLimit={data.memoryLimit}
            storage={data.storage}
          />

          <DeleteValidator validatorName={data.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const validatorName = context.params?.validatorName as string;
  try {
    const validator = await getValidator(validatorName);
    return { props: { validator }, revalidate: 10 };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default ValidatorDetailsPage;
