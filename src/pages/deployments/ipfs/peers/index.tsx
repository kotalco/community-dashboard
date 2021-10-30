import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon, CubeIcon } from '@heroicons/react/outline';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import { createButtons } from '@data/ipfs/links';
import { usePeers } from '@hooks/usePeers';
import { useClusterPeers } from '@hooks/useClusterPeers';
import { useNotification } from '@hooks/useNotification';

function Peers() {
  const { name, onClose } = useNotification('peer');
  const {
    peers,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    totalCount: peersCount,
  } = usePeers();
  const { totalCount: clusterpeersCount } = useClusterPeers();

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

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="IPFS Deployments" />
        <div className="py-4">
          <LinkedTabs tabs={tabs} />
          <EmptyState
            title="There is no peers created"
            description="Get started by creating a new peer."
            linkUrl="/deployments/ipfs/peers/create"
            linkName="New Peer"
          >
            <CubeIcon className="mx-auto w-12 h-12 text-gray-400" />
          </EmptyState>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="IPFS Deployments">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={tabs} />
        <List>
          {peers.map(({ name }) => (
            <ListItem
              key={name}
              link={`/deployments/ipfs/peers/${name}`}
              title={name}
            >
              <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <p>public-swarm</p>
              <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
              <p>go-ipfs</p>
            </ListItem>
          ))}
        </List>

        {!isReachedEnd && (
          <LoadMoreButton
            onChange={() => setSize(size + 1)}
            isLoading={isLoading}
          />
        )}
      </div>

      <NotificationPanel
        show={!!name}
        title="Peer has been created"
        close={onClose}
      >
        <p className="mt-1 text-sm text-gray-500">
          <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
            {name}
          </span>
          Peer has been created successfully, and will be up and running in few
          seconds.
        </p>
      </NotificationPanel>
    </Layout>
  );
}

export default Peers;
