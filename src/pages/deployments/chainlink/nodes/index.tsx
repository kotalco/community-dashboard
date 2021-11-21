import Error from 'next/error';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';

import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ChailinkIcon from '@components/Icons/ChainlinkIcon/ChailinkIcon';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import { useNotification } from '@hooks/useNotification';
import { useChainlinkNodes } from '@hooks/useChainlinkNodes';
import { getLabel } from '@utils/helpers/getLabel';
import { EVM_CHAINS } from '@data/chainlink/evmChain';

function ChainlinkNode() {
  const { name, onClose } = useNotification('chainlink');
  const {
    nodes,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    totalCount,
    error,
  } = useChainlinkNodes();

  const tabs = [
    {
      name: 'Chainlink Nodes',
      href: '/deployments/chainlink/nodes',
      count: totalCount,
    },
  ];

  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="Chainlink Deployments" />
        <LinkedTabs tabs={tabs} />
        <EmptyState
          title="There is no nodes created"
          description="Get started by creating a new node."
          linkUrl="/deployments/chainlink/nodes/create"
          linkName="New Chainlink Node"
        >
          <ChailinkIcon className="mx-auto w-12 h-12 text-gray-400" />
        </EmptyState>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Chainlink Deployments">
        <Button
          href="/deployments/chainlink/nodes/create"
          className="btn btn-primary"
        >
          Create New Chainlink Node
        </Button>
      </Heading>

      <LinkedTabs tabs={tabs} />
      <List>
        {nodes.map(({ name, ethereumChainId, linkContractAddress }) => (
          <ListItem
            key={name}
            link={`/deployments/chainlink/nodes/${name}`}
            title={name}
          >
            <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>
              {getLabel(
                `${ethereumChainId}:${linkContractAddress}`,
                EVM_CHAINS
              )}
            </p>
            <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
            <p>Chainlink</p>
          </ListItem>
        ))}
      </List>
      {!isReachedEnd && (
        <LoadMoreButton
          onChange={() => setSize(size + 1)}
          isLoading={isLoading}
        />
      )}

      <NotificationPanel
        show={!!name}
        title="Node has been created"
        close={onClose}
      >
        <p className="mt-1 text-sm text-gray-500">
          <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
            {name}
          </span>
          Node has been created successfully, and will be up and running in few
          seconds.
        </p>
      </NotificationPanel>
    </Layout>
  );
}

export default ChainlinkNode;
