import { NextPage } from 'next';

import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import Layout from '@components/templates/Layout/Layout';
import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Security from '@components/organisms/IPFS/ClusterPeer/Security/Security';
import Logging from '@components/organisms/Logging/Logging';
import Peers from '@components/organisms/IPFS/ClusterPeer/Peers/Peers';
import Resources from '@components/organisms/Resources/Resources';
import DangerZone from '@components/organisms/IPFS/ClusterPeer/DangerZone/DangerZone';
import withParams from '@components/hoc/withParams/withParams';
import { ClusterPeer, UpdateClusterPeer } from '@interfaces/ipfs/ClusterPeer';
import { updateClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { tabTitles } from '@data/ipfs/clusterPeers/tabTitles';
import { getLabel } from '@utils/helpers/getLabel';
import { consensusOptions } from '@data/ipfs/clusterPeers/consensusOptions';
import { useStatus } from '@hooks/useStatus';
import { PageWithParams } from '@interfaces/PageWithParams';

const ClusterPeerDetailsPage: NextPage<PageWithParams<ClusterPeer>> = ({
  data: clusterpeer,
  mutate,
}) => {
  const { status } = useStatus(
    clusterpeer && `/ipfs/clusterpeers/${clusterpeer.name}/status`
  );

  const updateResources = async (name: string, values: UpdateClusterPeer) => {
    await updateClusterPeer(name, values);
    mutate();
  };

  const dataList = [
    { label: 'Protocol', value: 'IPFS' },
    { label: 'Chain', value: 'public-swarm' },
    {
      label: 'Client',
      value: 'ipfs-cluster-service',
      href: 'https://github.com/ipfs/ipfs-cluster',
    },
    {
      label: 'Consensus',
      value: getLabel(clusterpeer.consensus, consensusOptions),
    },
    { label: 'ID', value: clusterpeer.id || 'N/A' },
    { label: 'From', value: clusterpeer.privatekeySecretName || 'N/A' },
  ];

  return (
    <Layout>
      <Heading
        title={clusterpeer.name}
        status={status}
        createdDate={clusterpeer.createdAt}
      />

      <div className="mt-4 bg-white rounded-lg shadow">
        <Tabs tabs={tabTitles} mutate={mutate}>
          <ProtocolDetails dataList={dataList} />

          <Peers {...clusterpeer} />

          <Security {...clusterpeer} />

          <Logging wsUrl={`/ipfs/clusterpeers/${clusterpeer.name}/logs`} />

          <Resources
            cpu={clusterpeer.cpu}
            cpuLimit={clusterpeer.cpuLimit}
            memory={clusterpeer.memory}
            memoryLimit={clusterpeer.memoryLimit}
            storage={clusterpeer.storage}
            name={clusterpeer.name}
            updateResources={updateResources}
          />

          <DangerZone peerName={clusterpeer.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(ClusterPeerDetailsPage, {
  params: 'peerName',
  url: '/ipfs/clusterpeers',
});
