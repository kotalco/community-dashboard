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
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import { useNotification } from '@hooks/useNotification';
import { getLabel } from '@utils/helpers/getLabel';
import { Deployments } from '@enums/Deployments';
import { NETWORKS } from '@data/near/networks';
import { useNearNodes } from '@hooks/useNearNodes';
import NearIcon from '@components/Icons/NearIcon/NearIcon';

function NearNodes() {
  const { NotificationPanel } = useNotification(Deployments.near);
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
  } = useNearNodes();

  const tabs = [
    {
      name: 'Nodes',
      href: '/deployments/near/nodes',
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
        <Heading title="Near Deployments" />
        <LinkedTabs tabs={tabs} />
        <EmptyState
          title="There is no nodes created"
          description="Get started by creating a new node."
          linkUrl="/deployments/near/nodes/create"
          linkName="New Near Node"
        >
          <NearIcon className="w-12 h-12 mx-auto text-gray-400" />
        </EmptyState>

        {NotificationPanel}
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Near Deployments">
        <Button
          href="/deployments/near/nodes/create"
          className="btn btn-primary"
        >
          Create New Near Node
        </Button>
      </Heading>

      <LinkedTabs tabs={tabs} />
      <List>
        {nodes.map(({ name, network }) => (
          <ListItem
            key={name}
            link={`/deployments/near/nodes/${name}`}
            title={name}
          >
            <GlobeAltIcon className="shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>{getLabel(network, NETWORKS)}</p>
            <ChipIcon className="shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
            <p>Nearcore</p>
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

export default NearNodes;
