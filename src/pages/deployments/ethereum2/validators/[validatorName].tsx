import { useRouter } from 'next/router';

import { updateValidator } from '@utils/requests/ethereum2/validators';
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
import { UpdateValidator } from '@interfaces/ethereum2/Validator';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import Logging from '@components/organisms/Logging/Logging';
import { useValidator } from '@hooks/useValidator';
import { useStatus } from '@hooks/useStatus';

function ValidatorDetailsPage() {
  const { query, push } = useRouter();
  const validatorName = query.validatorName as string | undefined;

  const { validator, error, mutate } = useValidator(validatorName);
  const { status } = useStatus(
    validator && `/ethereum2/validators/${validator.name}/status`
  );

  const updateResources = async (name: string, values: UpdateValidator) => {
    const validator = await updateValidator(name, values);
    mutate({ validator });
  };

  if (error) push('/404');
  if (!validator) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(validator.network, networkOptions) },
    { label: 'Client', value: getLabel(validator.client, clientOptions) },
  ];

  return (
    <Layout>
      <Heading
        title={validator.name}
        status={status}
        createdDate={validator.createdAt}
      />

      <div className="mt-4 bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={tabTitles}>
          <ProtocolDetails dataList={dataList} />

          <ValidatorGraffitiTab
            name={validator.name}
            graffiti={validator.graffiti}
          />

          <ValidatorKeystoreTab
            name={validator.name}
            keystores={validator.keystores}
            walletPasswordSecretName={validator.walletPasswordSecretName}
            client={validator.client}
          />

          <ValidatorBeaconNodeTab
            name={validator.name}
            beaconEndpoints={validator.beaconEndpoints}
            client={validator.client}
          />

          <Logging wsUrl={`/ethereum2/validators/${validator.name}/logs`} />

          <Resources
            name={validator.name}
            cpu={validator.cpu}
            cpuLimit={validator.cpuLimit}
            memory={validator.memory}
            memoryLimit={validator.memoryLimit}
            storage={validator.storage}
            updateResources={updateResources}
          />

          <DeleteValidator validatorName={validator.name} />
        </Tabs>
      </div>
    </Layout>
  );
}

export default ValidatorDetailsPage;
