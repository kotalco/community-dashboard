import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Tab } from '@headlessui/react';

import { getValidator } from '@utils/requests/ethereum2/validators';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import Heading from '@components/templates/Heading/Heading';
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
      <Heading title={validator.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles}>
          <Tab.Panel>
            <ValidatorProtocolTab client={data.client} network={data.network} />
          </Tab.Panel>
          <Tab.Panel>
            <ValidatorGraffitiTab name={data.name} graffiti={data.graffiti} />
          </Tab.Panel>
          <Tab.Panel>
            <ValidatorKeystoreTab
              name={data.name}
              keystores={data.keystores}
              walletPasswordSecretName={data.walletPasswordSecretName}
              client={data.client}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ValidatorBeaconNodeTab
              name={data.name}
              beaconEndpoints={data.beaconEndpoints}
              client={data.client}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ValidatorResourcesTab
              name={data.name}
              cpu={data.cpu}
              cpuLimit={data.cpuLimit}
              memory={data.memory}
              memoryLimit={data.memoryLimit}
              storage={data.storage}
            />
          </Tab.Panel>
          <Tab.Panel>
            <DeleteValidator validatorName={data.name} />
          </Tab.Panel>
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
