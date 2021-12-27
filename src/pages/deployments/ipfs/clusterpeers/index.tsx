import Error from 'next/error';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon, CubeIcon } from '@heroicons/react/outline';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import { createButtons } from '@data/ipfs/links';
import { useClusterPeers } from '@hooks/useClusterPeers';
import { usePeers } from '@hooks/usePeers';
import { useNotification } from '@hooks/useNotification';
import { Deployments } from '@enums/Deployments';

function ClusterPeers() {
  const { NotificationPanel } = useNotification(Deployments.clusterpeer);
  const {
    clusterpeers,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    error,
    totalCount: clusterpeersCount,
  } = useClusterPeers();
  const { totalCount: peersCount } = usePeers();

  const tabs = [
    {
      name: 'Peers',
      href: '/deployments/ipfs/peers',
      count: peersCount,
    },
    {
      name: 'Cluster Peers',
      href: '/deployments/ipfs/clusterpeers',
      count: clusterpeersCount,
    },
  ];

  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (error) <Error statusCode={500} />;

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="IPFS Deployments" />
        <LinkedTabs tabs={tabs} />
        <EmptyState
          title="There is no cluster peers created"
          description="Get started by creating a new cluster peer."
          linkUrl="/deployments/ipfs/clusterpeers/create"
          linkName="New Cluster Peer"
        >
          <CubeIcon className="w-12 h-12 mx-auto text-gray-400" />
        </EmptyState>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="IPFS Deployments">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <LinkedTabs tabs={tabs} />
      <List>
        {clusterpeers.map(({ name }) => (
          <ListItem
            key={name}
            link={`/deployments/ipfs/clusterpeers/${name}`}
            title={name}
          >
            <GlobeAltIcon className="shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>public-swarm</p>
            <ChipIcon className="shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
            <p>ipfs-cluster-service</p>
          </ListItem>
        ))}
      </List>

      {!isReachedEnd && (
        <LoadMoreButton
          onChange={() => setSize(size + 1)}
          isLoading={isLoading}
        />
      )}

      {NotificationPanel}
    </Layout>
  );
}

export default ClusterPeers;
