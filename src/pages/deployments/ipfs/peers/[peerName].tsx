import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DeleteIPFSPeer from '@components/organisms/IPFS/DeleteIPFSPeer/DeleteIPFSPeer';
import Tabs from '@components/organisms/Tabs/Tabs';
import IPFSConfigrationProfiles from '@components/organisms/IPFS/IPFSConfigrationProfiles/IPFSConfigrationProfiles';
import IPFSApiDetails from '@components/organisms/IPFS/IPFSApiDetails/IPFSApiDetails';
import IPFSGatewayDetails from '@components/organisms/IPFS/IPFSGatewayDetails/IPFSGatewayDetails';
import IPFSRoutingDetails from '@components/organisms/IPFS/IPFSRoutingDetails/IPFSRoutingDetails';
import { getIPFSPeer, updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { tabsTitles } from '@data/ipfs/peers/tabsTitles';
import Heading from '@components/templates/Heading/Heading';
import { Tab } from '@headlessui/react';
import ResourcesTab from '@components/organisms/Resources/Resources';
import { Resources } from '@interfaces/Resources';

interface Props {
  ipfsPeer: IPFSPeer;
}

const IPFSPeerDetailsPage: React.FC<Props> = ({ ipfsPeer }) => {
  const { isFallback, query } = useRouter();
  const { peerName } = query;

  const { data: peer, mutate } = useSWR(
    typeof peerName === 'string' ? peerName : null,
    getIPFSPeer,
    {
      initialData: ipfsPeer,
      revalidateOnMount: true,
    }
  );

  if (!peer || isFallback) return <LoadingIndicator />;

  const updateResources = async (name: string, values: Resources) => {
    const peer = await updateIPFSPeer(name, values);
    void mutate(peer);
  };

  const dataList = [
    { label: 'Protocol', value: 'IPFS' },
    { label: 'Chain', value: 'public-swarm' },
    { label: 'client', value: 'go-ipfs' },
  ];

  return (
    <Layout>
      <Heading title={peer.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabsTitles}>
          <Tab.Panel className="focus:outline-none">
            <ProtocolDetails dataList={dataList} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <IPFSConfigrationProfiles
              peerName={peer.name}
              profiles={peer.profiles}
              initProfiles={peer.initProfiles}
            />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <IPFSApiDetails
              peerName={peer.name}
              apiPort={peer.apiPort}
              apiHost={peer.apiHost}
            />
          </Tab.Panel>

          <Tab.Panel className="focus:outline-none">
            <IPFSGatewayDetails
              peerName={peer.name}
              gatewayPort={peer.gatewayPort}
              gatewayHost={peer.gatewayHost}
            />
          </Tab.Panel>

          <Tab.Panel className="focus:outline-none">
            <IPFSRoutingDetails peerName={peer.name} routing={peer.routing} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <ResourcesTab
              name={peer.name}
              cpu={peer.cpu}
              cpuLimit={peer.cpuLimit}
              storage={peer.storage}
              memory={peer.memory}
              memoryLimit={peer.memoryLimit}
              updateResources={updateResources}
            />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <DeleteIPFSPeer peerName={peer.name} />
          </Tab.Panel>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const peerName = context.params?.peerName as string;
  try {
    const ipfsPeer = await getIPFSPeer(peerName);

    return { props: { ipfsPeer } };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export default IPFSPeerDetailsPage;
