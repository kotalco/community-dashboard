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
import FilecoinIcon from '@components/Icons/FilecoinIcon/FilecoinIcon';
import { useNotification } from '@hooks/useNotification';
import { getLabel } from '@utils/helpers/getLabel';
import { Deployments } from '@enums/Deployments';
import { useFilecoinNodes } from '@hooks/useFilecoinNodes';
import { NETWORKS } from '@data/filecoin/networks';

function FilecoinNode() {
  const { NotificationPanel } = useNotification(Deployments.chainlink);
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
  } = useFilecoinNodes();
  console.log(nodes);

  const tabs = [
    {
      name: 'Nodes',
      href: '/deployments/filecoin/nodes',
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
        <Heading title="Filecoin Deployments" />
        <LinkedTabs tabs={tabs} />
        <EmptyState
          title="There is no nodes created"
          description="Get started by creating a new node."
          linkUrl="/deployments/filecoin/nodes/create"
          linkName="New Filecoin Node"
        >
          <FilecoinIcon className="w-12 h-12 mx-auto text-gray-400" />
        </EmptyState>

        {NotificationPanel}
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Filecoin Deployments">
        <Button
          href="/deployments/filecoin/nodes/create"
          className="btn btn-primary"
        >
          Create New Filecoin Node
        </Button>
      </Heading>

      <LinkedTabs tabs={tabs} />
      <List>
        {nodes.map(({ name, network }) => (
          <ListItem
            key={name}
            link={`/deployments/filecoin/nodes/${name}`}
            title={name}
          >
            <GlobeAltIcon className="shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <p>{getLabel(network, NETWORKS)}</p>
            <ChipIcon className="shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
            <p>Lotus</p>
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

export default FilecoinNode;
