import { useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon, CubeIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import Button from '@components/atoms/Button/Button';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import { createButtons, resourcesTab } from '@data/ipfs/links';
import { useClusterPeers } from '@utils/requests/ipfs/clusterPeers';
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { useNotification } from '@components/contexts/NotificationContext';
import { fetcher } from '@utils/axios';

export const IPFSPeers = ({
  clusterpeers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { notificationData, removeNotification } = useNotification();
  const { data } = useClusterPeers({ initialData: { clusterpeers } });

  useEffect(() => {
    return () => {
      removeNotification();
    };
  }, [removeNotification]);

  return (
    <Layout>
      <Heading title="IPFS Cluster Peers">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        {data?.length ? (
          <List>
            {data.map(({ name }) => (
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
        ) : (
          <div className="text-center bg-white py-6 rounded-tr-md rounded-b-md">
            <CubeIcon className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No Cluster Peers
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new Cluster Peer.
            </p>
            <div className="mt-6">
              <Button
                href="/deployments/ipfs/clusterpeers/create"
                className="btn btn-primary"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Cluster Peer
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
            `${notificationData?.protocol} has been ${notificationData?.action}`}
        </p>
      </NotificationPanel>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const { clusterpeers } = await fetcher<{ clusterpeers: IPFSPeer[] }>(
    '/ipfs/clusterpeers'
  );

  return { props: { clusterpeers }, revalidate: 10 };
};

export default IPFSPeers;
