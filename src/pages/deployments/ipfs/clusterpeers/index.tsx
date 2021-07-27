import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import Heading from '@components/templates/Heading/Heading';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import { createButtons, resourcesTab } from '@data/ipfs/links';
import { useClusterPeers } from '@utils/requests/ipfs/clusterPeers';
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer';
import { useNotification } from '@components/contexts/NotificationContext';
import { fetcher } from '@utils/axios';
import { IPFSClusterPeer } from '@interfaces/ipfs/IPFSClusterPeer';

interface Props {
  initialClusterPeers: { clusterpeers: IPFSClusterPeer[] };
}

export const IPFSPeers: React.FC<Props> = ({ initialClusterPeers }) => {
  const { notificationData, removeNotification } = useNotification();
  const { clusterpeers } = useClusterPeers(initialClusterPeers);

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
        {clusterpeers && clusterpeers.length ? (
          <List>
            {clusterpeers.map(({ name }) => (
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
          <div className="bg-white p-4 text-center">
            <p>There is no cluster peers created</p>
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const clusterpeers = await fetcher<{ clusterpeers: IPFSPeer[] }>(
      '/ipfs/clusterpeers'
    );

    return { props: { initialClusterPeers: clusterpeers }, revalidate: 10 };
  } catch (e) {
    return { notFound: true };
  }
};

export default IPFSPeers;
