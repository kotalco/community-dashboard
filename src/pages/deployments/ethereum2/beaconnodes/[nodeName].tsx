import { NextPage } from 'next';

import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab';
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab';
import DangerZone from '@components/organisms/Ethereum2/BeaconNode/DangerZone/DangerZone';
import Heading from '@components/templates/Heading/Heading';
import Resources from '@components/organisms/Resources/Resources';
import Logging from '@components/organisms/Logging/Logging';
import withParams from '@components/hoc/withParams/withParams';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { BeaconNode, UpdateBeaconnode } from '@interfaces/ethereum2/BeaconNode';
import { getLabel } from '@utils/helpers/getLabel';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { getHref } from '@utils/helpers/getHref';
import { PageWithParams } from '@interfaces/PageWithParams';

const BeaconNodeDetailsPage: NextPage<PageWithParams<BeaconNode>> = ({
  data: beaconnode,
  mutate,
}) => {
  const { status } = useStatus(
    `/ethereum2/beaconnodes/${beaconnode.name}/status`
  );

  const updateResources = async (name: string, values: UpdateBeaconnode) => {
    await updateBeaconNode(name, values);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(beaconnode.network, networkOptions) },
    {
      label: 'Client',
      value: getLabel(beaconnode.client, clientOptions),
      href: getHref(beaconnode.client),
    },
  ];
  return (
    <Layout>
      <Heading
        title={beaconnode.name}
        status={status}
        createdDate={beaconnode.createdAt}
      />

      <div className="mt-4 bg-white rounded-lg shadow">
        <Tabs tabs={tabTitles} mutate={mutate}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Ethereum */}
          <BeaconNodeEthereumTab {...beaconnode} />

          {/* API */}
          <BeaconNodeAPITab {...beaconnode} />

          {/* Logging */}
          <Logging wsUrl={`/ethereum2/beaconnodes/${beaconnode.name}/logs`} />

          {/* Resources */}
          <Resources
            name={beaconnode.name}
            cpu={beaconnode.cpu}
            cpuLimit={beaconnode.cpuLimit}
            memory={beaconnode.memory}
            memoryLimit={beaconnode.memoryLimit}
            storage={beaconnode.storage}
            updateResources={updateResources}
          />

          {/* Danger zone */}
          <DangerZone nodeName={beaconnode.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(BeaconNodeDetailsPage, {
  params: 'nodeName',
  url: '/ethereum2/beaconnodes',
});
