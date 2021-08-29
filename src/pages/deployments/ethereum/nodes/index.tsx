import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { GlobeAltIcon, PlusIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';
// import useSWR from 'swr';

import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import EthereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import { useNotification } from '@components/contexts/NotificationContext';
import { getAllNodes } from '@utils/requests/ethereumNodeRequests';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { resourcesTab } from '@data/ethereum/links';
import { getClientLabel } from '@data/ethereum/node/clientOptions';
import { getNetworkLabel } from '@data/ethereum/node/networkOptions';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import Heading from '@components/templates/Heading/Heading';
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
                <p>{getClientLabel(client)}</p>
                <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{getNetworkLabel(network)}</p>
              </ListItem>
            ))}
          </List>
        ) : (
          <div className="text-center bg-white py-6 rounded-tr-md rounded-b-md">
            <EthereumIcon className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              There is no nodes created
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new node.
            </p>
            <div className="mt-6">
              <Button
                href="/deployments/ethereum/nodes/create"
                className="btn btn-primary"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Node
              </Button>
            </div>
          </div>
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
