import { useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import Heading from '@components/templates/Heading/Heading';
import EThereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import { useNotification } from '@components/contexts/NotificationContext';
import { useBeaconnodes } from '@utils/requests/ethereum2/beaconNodes';
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode';
import { resourcesTab, createButtons } from '@data/ethereum2/links';
import Button from '@components/atoms/Button/Button';
import { fetcher } from '@utils/axios';

function BeaconnodesPage({
  beaconnodes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { notificationData, removeNotification } = useNotification();
  const { data } = useBeaconnodes({
    initialData: { beaconnodes },
  });

  useEffect(() => {
    return () => removeNotification();
  }, [removeNotification]);

  return (
    <Layout>
      <Heading title="Ethereum 2.0">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        {data?.length ? (
          <List>
            {beaconnodes.map(({ name, client, network }) => (
              <ListItem
                key={name}
                link={`/deployments/ethereum2/beaconnodes/${name}`}
                title={name}
              >
                <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{client}</p>
                <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{network}</p>
              </ListItem>
            ))}
          </List>
        ) : (
          <div className="text-center bg-white py-6 rounded-tr-md rounded-b-md">
            <EThereumIcon className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No Beacon Nodes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new beacon node.
            </p>
            <div className="mt-6">
              <Button
                href="/deployments/ethereum2/beaconnodes/create"
                className="btn btn-primary"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Beacon Node
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
}

export const getStaticProps = async () => {
  const { beaconnodes } = await fetcher<{ beaconnodes: Ethereum2BeaconNode[] }>(
    '/ethereum2/beaconnodes'
  );
  return { props: { beaconnodes }, revalidate: 10 };
};

export default BeaconnodesPage;
