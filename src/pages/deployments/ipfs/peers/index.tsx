import Error from 'next/error';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import IPFSIcon from '@components/Icons/IPFSIcon/IPFSIcon';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { createButtons } from '@data/ipfs/links';
import { useNotification } from '@hooks/useNotification';
import { Deployments } from '@enums/Deployments';
import { Peer } from '@interfaces/ipfs/Peer';

function Peers() {
  const { NotificationPanel } = useNotification(Deployments.peer);
  const {
    data: peers,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    error,
    totalCount: peersCount,
  } = useInfiniteRequest<Peer>('/ipfs/peers');
  const { totalCount: clusterpeersCount } =
    useInfiniteRequest('/ipfs/clusterpeers');

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

  if (error) return <Error statusCode={500} />;

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="IPFS Deployments" />
        <LinkedTabs tabs={tabs} />
        <EmptyState
          title="There is no peers created"
          description="Get started by creating a new peer."
          linkUrl="/deployments/ipfs/peers/create"
          linkName="New Peer"
        >
          <IPFSIcon className="w-12 h-12 mx-auto text-gray-400" />
        </EmptyState>

        {NotificationPanel}
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
        {peers.map(({ name }) => (
          <ListItem
            key={name}
            link={`/deployments/ipfs/peers/${name}`}
            title={name}
          >
            <GlobeAltIcon className="shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>public-swarm</p>
            <ChipIcon className="shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
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

      {NotificationPanel}
    </Layout>
  );
}

export default Peers;
