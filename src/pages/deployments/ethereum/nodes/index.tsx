import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
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
import { useNotification } from '@components/contexts/NotificationContext';
import { getAllNodes } from '@utils/requests/ethereum';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { resourcesTab } from '@data/ethereum/links';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { getLabel } from '@utils/helpers/getLabel';
// import { AxiosError } from 'axios';

interface Props {
  ethereumNodes: EthereumNode[];
}

const EthereumNodes: React.FC<Props> = ({ ethereumNodes }) => {
  const { notificationData, removeNotification } = useNotification();

  // const { data, error } = useSWR<EthereumNode[], AxiosError>(
  //   '/ethereum/nodes',
  //   getAllNodes,
  //   {
  //     initialData: ethereumNodes,
  //     revalidateOnMount: true,
  //   }
  // );

  useEffect(() => {
    return () => removeNotification();
  }, [removeNotification]);

  return (
    <Layout>
      <Heading title="Nodes">
        {!!ethereumNodes.length && (
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
        {ethereumNodes.length ? (
          <List>
            {ethereumNodes.map(({ name, client, network }) => (
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
        ) : (
          <EmptyState
            title="There is no nodes created"
            description="Get started by creating a new node."
            linkUrl="/deployments/ethereum/nodes/create"
            linkName="New Node"
          >
            <EthereumIcon className="mx-auto w-12 h-12 text-gray-400" />
          </EmptyState>
        )}
      </div>

      <NotificationPanel
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
      </NotificationPanel>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const ethereumNodes = await getAllNodes();
    return { props: { ethereumNodes } };
  } catch (e) {
    return { notFound: true };
  }
};

export default EthereumNodes;
