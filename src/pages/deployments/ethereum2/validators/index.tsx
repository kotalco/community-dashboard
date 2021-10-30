// import { useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';

import EthereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import Heading from '@components/templates/Heading/Heading';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
// import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
// import { useNotification } from '@components/contexts/NotificationContext';
import { createButtons } from '@data/ethereum2/links';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { useValidators } from '@hooks/useValidators';
import { useBeaconNodes } from '@hooks/useBeaconNodes';

function Validators() {
  // const { notificationData, removeNotification } = useNotification();

  const {
    validators,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    totalCount: validatorsCount,
  } = useValidators();
  const { totalCount: beaconnodesCount } = useBeaconNodes();

  const tabs = [
    {
      name: 'Beacon Nodes',
      href: '/deployments/ethereum2/beaconnodes',
      count: beaconnodesCount,
    },
    {
      name: 'Validators',
      href: '/deployments/ethereum2/validators',
      count: validatorsCount,
    },
  ];

  // useEffect(() => {
  //   return () => removeNotification();
  // }, [removeNotification]);

  if (isInitialLoading) {
    return <LoadingIndicator />;
  }

  if (isEmpty) {
    return (
      <Layout>
        <Heading title="Ethereum 2.0 Deployments" />
        <div className="py-4">
          <LinkedTabs tabs={tabs} />
          <EmptyState
            title="There is no validators created"
            description="Get started by creating a new validator."
            linkUrl="/deployments/ethereum2/validators/create"
            linkName="New Validator"
          >
            <EthereumIcon className="mx-auto w-12 h-12 text-gray-400" />
          </EmptyState>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading title="Ethereum 2.0 Deployments">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={tabs} />
        <List>
          {validators.map(({ name, client, network }) => (
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
        {!isReachedEnd && (
          <LoadMoreButton
            onChange={() => setSize(size + 1)}
            isLoading={isLoading}
          />
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
            `${notificationData?.protocol} has been ${notificationData?.action}`}
        </p>
      </NotificationPanel> */}
    </Layout>
  );
}

export default Validators;
