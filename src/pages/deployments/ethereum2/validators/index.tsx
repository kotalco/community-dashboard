import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';
import useSWR from 'swr';

import EthereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import { useNotification } from '@components/contexts/NotificationContext';
import { getAllValidators } from '@utils/requests/ethereum2/validators';
import { Ethereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator';
import { resourcesTab, createButtons } from '@data/ethereum2/links';
import { AxiosError } from 'axios';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';

interface Props {
  validators: Ethereum2Validator[];
}

const Ethereum2Validators: React.FC<Props> = ({ validators }) => {
  const { notificationData, removeNotification } = useNotification();

  const { data, error } = useSWR<Ethereum2Validator[], AxiosError>(
    '/ethereum2/validators',
    getAllValidators,
    {
      initialData: validators,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    return () => removeNotification();
  }, [removeNotification]);

  if (error) return <p>failed to load validators</p>;

  return (
    <Layout>
      <div className="flex">
        <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
          Ethereum 2.0 Deployments
        </h1>

        <ButtonGroup label="Create New" buttons={createButtons} />
      </div>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        {data && data.length > 0 ? (
          <List>
            {data.map(({ name, client, network }) => (
              <ListItem
                key={name}
                link={`/deployments/ethereum2/validators/${name}`}
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
            title="There is no validators created"
            description="Get started by creating a new validator."
            linkUrl="/deployments/ethereum2/validators/create"
            linkName="New Validator"
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
            `${notificationData?.protocol} has been ${notificationData?.action}`}
        </p>
      </NotificationPanel>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const validators = await getAllValidators();
  return { props: { validators }, revalidate: 10 };
};

export default Ethereum2Validators;
