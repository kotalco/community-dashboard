import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import {
  getValidator,
  updateValidator,
} from '@utils/requests/ethereum2/validators';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import Heading from '@components/templates/Heading/Heading';
import ValidatorGraffitiTab from '@components/organisms/Ethereum2/Validator/ValidatorGarfittiTab/ValidatorGarfittiTab';
import ValidatorKeystoreTab from '@components/organisms/Ethereum2/Validator/ValidatorKeystoreTab/ValidatorKeystoreTab';
import ValidatorBeaconNodeTab from '@components/organisms/Ethereum2/Validator/ValidatorBeaconNodeTab/ValidatorBeaconNodeTab';
import Resources from '@components/organisms/Resources/Resources';
import DeleteValidator from '@components/organisms/Ethereum2/Validator/DeleteValidator/DeleteValidator';
import { tabTitles } from '@data/ethereum2/validator/tabTitles';
import { Validator, UpdateValidator } from '@interfaces/ethereum2/Validator';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import Logging from '@components/organisms/Logging/Logging';

interface Props {
  validator: Validator;
}

const ValidatorDetailsPage: React.FC<Props> = ({ validator }) => {
  const { isFallback, query } = useRouter();
  const { validatorName } = query;

  const { data, mutate } = useSWR(
    typeof validatorName === 'string' ? validatorName : null,
    getValidator,
    {
      fallbackData: validator,
      revalidateOnMount: true,
    }
  );

  const updateResources = async (name: string, values: UpdateValidator) => {
    const validator = await updateValidator(name, values);
    void mutate(validator);
  };

  if (!data || isFallback) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(data.network, networkOptions) },
    { label: 'Client', value: getLabel(data.client, clientOptions) },
  ];

  return (
    <Layout>
      <Heading title={validator.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles}>
          <ProtocolDetails dataList={dataList} />

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

          <Logging wsUrl={`/ethereum2/validators/${data.name}/logs`} />

          <Resources
            name={data.name}
            cpu={data.cpu}
            cpuLimit={data.cpuLimit}
            memory={data.memory}
            memoryLimit={data.memoryLimit}
            storage={data.storage}
            updateResources={updateResources}
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
