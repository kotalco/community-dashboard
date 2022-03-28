import { NextPage } from 'next';

import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import Heading from '@components/templates/Heading/Heading';
import ValidatorGraffitiTab from '@components/organisms/Ethereum2/Validator/ValidatorGarfittiTab/ValidatorGarfittiTab';
import ValidatorKeystoreTab from '@components/organisms/Ethereum2/Validator/ValidatorKeystoreTab/ValidatorKeystoreTab';
import ValidatorBeaconNodeTab from '@components/organisms/Ethereum2/Validator/ValidatorBeaconNodeTab/ValidatorBeaconNodeTab';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import Logging from '@components/organisms/Logging/Logging';
import Resources from '@components/organisms/Resources/Resources';
import DangerZone from '@components/organisms/Ethereum2/Validator/DangerZone/DangerZone';
import withParams from '@components/hoc/withParams/withParams';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { tabTitles } from '@data/ethereum2/validator/tabTitles';
import { UpdateValidator, Validator } from '@interfaces/ethereum2/Validator';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { getHref } from '@utils/helpers/getHref';
import { PageWithParams } from '@interfaces/PageWithParams';

const ValidatorDetailsPage: NextPage<PageWithParams<Validator>> = ({
  data: validator,
  mutate,
}) => {
  const { status } = useStatus(
    validator && `/ethereum2/validators/${validator.name}/status`
  );

  const updateResources = async (name: string, values: UpdateValidator) => {
    await updateValidator(name, values);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(validator.network, networkOptions) },
    {
      label: 'Client',
      value: getLabel(validator.client, clientOptions),
      href: getHref(validator.client),
    },
  ];

  return (
    <Layout>
      <Heading
        title={validator.name}
        status={status}
        createdDate={validator.createdAt}
      />

      <div className="mt-4 bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={tabTitles} mutate={mutate}>
          <ProtocolDetails dataList={dataList} />

          <ValidatorGraffitiTab {...validator} />

          <ValidatorKeystoreTab {...validator} />

          <ValidatorBeaconNodeTab {...validator} />

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

          <DangerZone validatorName={validator.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(ValidatorDetailsPage, {
  params: 'validatorName',
  url: '/ethereum2/validators',
});
