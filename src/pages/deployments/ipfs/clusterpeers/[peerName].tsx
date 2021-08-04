import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

import { fetcher } from '@utils/axios';
import { IPFSClusterPeer } from '@interfaces/ipfs/IPFSClusterPeer';
import { useClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { tabTitles } from '@data/ipfs/clusterPeers/tabTitles';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import Layout from '@components/templates/Layout/Layout';
import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Protocol from '@components/organisms/IPFS/ClusterPeer/Protocol/Protocol';
import Security from '@components/organisms/IPFS/ClusterPeer/Security/Security';
import Resources from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeResourcesTab/BeaconNodeResourcesTab';
import Peers from '@components/organisms/IPFS/ClusterPeer/Peers/Peers';

interface Props {
  initialClusterpeer?: IPFSClusterPeer;
}

const ClusterPeerDetailsPage: React.FC<Props> = ({ initialClusterpeer }) => {
  const { isFallback } = useRouter();
  const { data: clusterpeer } = useClusterPeer(initialClusterpeer?.name, {
    initialData: { clusterpeer: initialClusterpeer },
  });

  if (!clusterpeer || isFallback) return <LoadingIndicator />;

  return (
    <Layout>
      <Heading title={clusterpeer.name} />

      <div className="bg-white shadow rounded-lg mt-4">
        <Tabs tabs={tabTitles}>
          <Tab.Panel>
            <Protocol
              consensus={clusterpeer.consensus}
              id={clusterpeer.id}
              privatekeySecretName={clusterpeer.privatekeySecretName}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Peers
              peerEndpoint={clusterpeer.peerEndpoint}
              trustedPeers={clusterpeer.trustedPeers || []}
              bootstrapPeers={clusterpeer.bootstrapPeers || []}
              name={clusterpeer.name}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Security clusterSecretName={clusterpeer.clusterSecretName} />
          </Tab.Panel>
          <Tab.Panel>{/* <Resources /> */}</Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const peerName = context.params?.peerName as string;
  try {
    const { clusterpeer } = await fetcher<{ clusterpeer: IPFSClusterPeer }>(
      `/ipfs/clusterpeers/${peerName}`
    );

    return {
      props: { initialClusterpeer: clusterpeer },
      revalidate: 10,
    };
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

export default ClusterPeerDetailsPage;
