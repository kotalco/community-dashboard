import { useRouter } from 'next/router';

import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { useBeaconnode } from '@hooks/useBeaconNode';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab';
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab';
import DeleteBeaconNode from '@components/organisms/Ethereum2/BeaconNode/DeleteBeaconNode/DeleteBeaconNode';
import Resources from '@components/organisms/Resources/Resources';
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { UpdateBeaconnode } from '@interfaces/ethereum2/BeaconNode';
import React from 'react';
import Heading from '@components/templates/Heading/Heading';
import { getLabel } from '@utils/helpers/getLabel';
import Logging from '@components/organisms/Logging/Logging';
import { useStatus } from '@hooks/useStatus';

function Ethereum2NodeDetailsPage() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;
  const { beaconnode, mutate, error } = useBeaconnode(nodeName);
  const { status } = useStatus(
    beaconnode && `/ethereum2/beaconnodes/${beaconnode.name}/status`
  );

  const updateResources = async (name: string, values: UpdateBeaconnode) => {
    const beaconnode = await updateBeaconNode(name, values);
    mutate({ beaconnode });
  };

  if (error) push('/404');
  if (!beaconnode) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(beaconnode.network, networkOptions) },
    { label: 'Client', value: getLabel(beaconnode.client, clientOptions) },
  ];
  return (
    <Layout>
      <Heading
        title={beaconnode.name}
        status={status}
        createdDate={beaconnode.createdAt}
      />

      <div className="mt-4 bg-white rounded-lg shadow">
        <Tabs tabs={tabTitles}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Ethereum */}
          <BeaconNodeEthereumTab
            name={beaconnode.name}
            client={beaconnode.client}
            eth1Endpoints={beaconnode.eth1Endpoints}
            network={beaconnode.network}
          />

          {/* API */}
          <BeaconNodeAPITab
            name={beaconnode.name}
            rest={beaconnode.rest}
            restHost={beaconnode.restHost}
            restPort={beaconnode.restPort}
            rpc={beaconnode.rpc}
            rpcPort={beaconnode.rpcPort}
            rpcHost={beaconnode.rpcHost}
            grpc={beaconnode.grpc}
            grpcHost={beaconnode.grpcHost}
            grpcPort={beaconnode.grpcPort}
            client={beaconnode.client}
          />

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
          <DeleteBeaconNode nodeName={beaconnode.name} />
        </Tabs>
      </div>
    </Layout>
  );
}

export default Ethereum2NodeDetailsPage;
