import { NextPage } from 'next';

import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/IPFS/DangerZone/DangerZone';
import Tabs from '@components/organisms/Tabs/Tabs';
import IPFSConfigrationProfiles from '@components/organisms/IPFS/IPFSConfigrationProfiles/IPFSConfigrationProfiles';
import IPFSApiDetails from '@components/organisms/IPFS/IPFSApiDetails/IPFSApiDetails';
import IPFSGatewayDetails from '@components/organisms/IPFS/IPFSGatewayDetails/IPFSGatewayDetails';
import IPFSRoutingDetails from '@components/organisms/IPFS/IPFSRoutingDetails/IPFSRoutingDetails';
import Logging from '@components/organisms/Logging/Logging';
import ResourcesTab from '@components/organisms/Resources/Resources';
import Heading from '@components/templates/Heading/Heading';
import withParams from '@components/hoc/withParams/withParams';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { tabsTitles } from '@data/ipfs/peers/tabsTitles';
import { Resources } from '@interfaces/Resources';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { Peer } from '@interfaces/ipfs/Peer';
import { PageWithParams } from '@interfaces/PageWithParams';

const IPFSPeerDetailsPage: NextPage<PageWithParams<Peer>> = ({
  data: peer,
  mutate,
}) => {
  const { status } = useStatus(peer && `/ipfs/peers/${peer.name}/status`);

  const updateResources = async (name: string, values: Resources) => {
    await updateIPFSPeer(name, values);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'IPFS' },
    { label: 'Chain', value: 'public-swarm' },
    {
      label: 'client',
      value: 'go-ipfs',
      href: 'https://github.com/ipfs/go-ipfs',
    },
  ];

  return (
    <Layout>
      <Heading title={peer.name} status={status} createdDate={peer.createdAt} />

      <div className="mt-4 bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={tabsTitles} mutate={mutate}>
          <ProtocolDetails dataList={dataList} />

          <IPFSConfigrationProfiles {...peer} />

          <IPFSApiDetails {...peer} />

          <IPFSGatewayDetails {...peer} />

          <IPFSRoutingDetails {...peer} />

          <Logging wsUrl={`/ipfs/peers/${peer.name}/logs`} />

          <ResourcesTab
            name={peer.name}
            cpu={peer.cpu}
            cpuLimit={peer.cpuLimit}
            storage={peer.storage}
            memory={peer.memory}
            memoryLimit={peer.memoryLimit}
            updateResources={updateResources}
          />

          <DangerZone peerName={peer.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(IPFSPeerDetailsPage, {
  params: 'peerName',
  url: '/ipfs/peers',
});
