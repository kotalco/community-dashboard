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
import { getIPFSPeer } from '@utils/requests/ipfs/peers';
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { tabsTitles } from '@data/ipfs/peers/tabsTitles';
import Heading from '@components/templates/Heading/Heading';
import { Tab } from '@headlessui/react';

interface Props {
  ipfsPeer: IPFSPeer;
}

const IPFSPeerDetailsPage: React.FC<Props> = ({ ipfsPeer }) => {
  const { isFallback, query } = useRouter();
  const { peerName } = query;

  const { data } = useSWR(
    typeof peerName === 'string' ? peerName : null,
    getIPFSPeer,
    {
      initialData: ipfsPeer,
      revalidateOnMount: true,
    }
  );

  if (!data || isFallback) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'IPFS' },
    { label: 'Chain', value: 'public-swarm' },
    { label: 'client', value: 'go-ipfs' },
  ];

  return (
    <Layout>
      <Heading title={data.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabsTitles}>
          <Tab.Panel className="focus:outline-none">
            <ProtocolDetails dataList={dataList} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <IPFSConfigrationProfiles
              peerName={data.name}
              profiles={data.profiles}
              initProfiles={data.initProfiles}
            />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <IPFSApiDetails
              peerName={data.name}
              apiPort={data.apiPort}
              apiHost={data.apiHost}
            />
          </Tab.Panel>

          <Tab.Panel className="focus:outline-none">
            <IPFSGatewayDetails
              peerName={data.name}
              gatewayPort={data.gatewayPort}
              gatewayHost={data.gatewayHost}
            />
          </Tab.Panel>

          <Tab.Panel className="focus:outline-none">
            <IPFSRoutingDetails peerName={data.name} routing={data.routing} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <DeleteIPFSPeer peerName={data.name} />
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
