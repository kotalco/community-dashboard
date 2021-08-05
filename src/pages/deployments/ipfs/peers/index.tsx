import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon, CubeIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import Button from '@components/atoms/Button/Button';
import { createButtons, resourcesTab } from '@data/ipfs/links';
import { usePeers } from '@utils/requests/ipfs/peers';
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { useNotification } from '@components/contexts/NotificationContext';
import { fetcher } from '@utils/axios';

interface Props {
  initialPeers: { peers: IPFSPeer[] };
}

export const IPFSPeers: React.FC<Props> = ({ initialPeers }) => {
  const { notificationData, removeNotification } = useNotification();
  const { peers } = usePeers(initialPeers);

  useEffect(() => {
    return () => {
      removeNotification();
    };
  }, [removeNotification]);

  return (
    <Layout>
      <Heading title="IPFS Peers">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        {peers && peers.length ? (
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
        ) : (
          <div className="text-center bg-white py-6 rounded-tr-md rounded-b-md">
            <CubeIcon className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Peers</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new Peer.
            </p>
            <div className="mt-6">
              <Button
                href="/deployments/ipfs/peers/create"
                className="btn btn-primary"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Peer
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const peers = await fetcher<{ peers: IPFSPeer[] }>('/ipfs/peers');
    return { props: { initialPeers: peers }, revalidate: 10 };
  } catch (e) {
    return { notFound: true };
  }
};

export default IPFSPeers;
