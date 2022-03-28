import { useRouter } from 'next/router';
import Error from 'next/error';

import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab';
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab';
import DangerZone from '@components/organisms/Ethereum2/BeaconNode/DangerZone/DangerZone';
import Heading from '@components/templates/Heading/Heading';
import Resources from '@components/organisms/Resources/Resources';
import Logging from '@components/organisms/Logging/Logging';
import useRequest from '@hooks/useRequest';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { BeaconNode, UpdateBeaconnode } from '@interfaces/ethereum2/BeaconNode';
import { getLabel } from '@utils/helpers/getLabel';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { getHref } from '@utils/helpers/getHref';

function Ethereum2NodeDetailsPage() {
  const { query } = useRouter();
  const nodeName = (query.nodeName as string) || undefined;

  const {
    data: beaconnode,
    mutate,
    error,
  } = useRequest<BeaconNode>(
    nodeName ? { url: `ethereum2/beaconnodes/${nodeName}` } : null
  );
  const { status } = useStatus(
    beaconnode && `/ethereum2/beaconnodes/${beaconnode.name}/status`
  );

  const updateResources = async (name: string, values: UpdateBeaconnode) => {
    await updateBeaconNode(name, values);
    mutate();
  };

  if (error) return <Error statusCode={error.response?.status || 500} />;
  if (!beaconnode) return <LoadingIndicator />;

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
}

export default Ethereum2NodeDetailsPage;
