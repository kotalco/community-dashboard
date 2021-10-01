import { useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';
// import useSWR from 'swr';

import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import EthereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import { useNotification } from '@components/contexts/NotificationContext';
import { resourcesTab } from '@data/ethereum/links';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { getLabel } from '@utils/helpers/getLabel';
import { useEthereumNodes } from '@hooks/useEhereumNodes';
import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon';

function EthereumNodes() {
  const {
    nodes,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
  } = useEthereumNodes();

  // const { notificationData, removeNotification } = useNotification();

  // useEffect(() => {
  //   return () => removeNotification();
  // }, [removeNotification]);
  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="Ethereum Deployments" />
        <EmptyState
          title="There is no nodes created"
          description="Get started by creating a new node."
          linkUrl="/deployments/ethereum/nodes/create"
          linkName="New Node"
        >
          <EthereumIcon className="mx-auto w-12 h-12 text-gray-400" />
        </EmptyState>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Ethereum Deployments">
        {!isEmpty && (
          <Button
            href="/deployments/ethereum/nodes/create"
            className="btn btn-primary"
          >
            Create New Node
          </Button>
        )}
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        <List>
          {nodes.map(({ name, client, network }) => (
            <ListItem
              key={name}
              link={`/deployments/ethereum/nodes/${name}`}
              title={name}
            >
              <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <p>{getLabel(network, networkOptions)}</p>
              <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
              <p>{getLabel(client, clientOptions)}</p>
            </ListItem>
          ))}
        </List>
        {!isReachedEnd && (
          <div className="flex justify-center items-center py-4">
            <button
              onClick={() => setSize(size + 1)}
              disabled={isLoading}
              className="text-sm text-indigo-500 hover:text-indigo-600 disabled:hover:text-indigo-500 disabled:pointer-events-none"
            >
              {isLoading ? <SpinnerIcon className="h-4 w-4" /> : 'Load More...'}
            </button>
          </div>
        )}
      </div>

      {/* <NotificationPanel
        show={!!notificationData}
        title={notificationData?.title}
        close={removeNotification}
      >
        <p className="mt-1 text-sm text-gray-500">
          <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
            {notificationData?.name}
          </span>{' '}
          {!!notificationData &&
            `${notificationData.protocol} has been ${notificationData.action}`}
        </p>
      </NotificationPanel> */}
    </Layout>
  );
}

export default EthereumNodes;
