import { GlobeAltIcon } from '@heroicons/react/solid';
import { ChipIcon } from '@heroicons/react/outline';

import Layout from '@components/templates/Layout/Layout';
import List from '@components/organisms/List/List';
import ListItem from '@components/molecules/ListItem/ListItem';
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs';
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup';
import Heading from '@components/templates/Heading/Heading';
import EThereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import EmptyState from '@components/molecules/EmptyState/EmptyState';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import LoadMoreButton from '@components/atoms/LoadMoreButton/LoadMoreButton';
import { useNotification } from '@hooks/useNotification';
import { useBeaconNodes } from '@hooks/useBeaconNodes';
import { createButtons } from '@data/ethereum2/links';
import { getLabel } from '@utils/helpers/getLabel';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { useValidators } from '@hooks/useValidators';

function Beaconnodes() {
  const { name, onClose } = useNotification('beaconnode');
  const {
    baeconnodes,
    isEmpty,
    isInitialLoading,
    size,
    setSize,
    isReachedEnd,
    isLoading,
    totalCount: beaconnodesCount,
  } = useBeaconNodes();
  const { totalCount: validatorsCount } = useValidators();

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
            title="There is no beacon nodes created"
            description="Get started by creating a new beacon node."
            linkUrl="/deployments/ethereum2/beaconnodes/create"
            linkName="New Beacon Node"
          >
            <EThereumIcon className="mx-auto w-12 h-12 text-gray-400" />
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
          {baeconnodes.map(({ name, client, network }) => (
            <ListItem
              key={name}
              link={`/deployments/ethereum2/beaconnodes/${name}`}
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

      <NotificationPanel
        show={!!name}
        title="Beacon node has been created"
        close={onClose}
      >
        <p className="mt-1 text-sm text-gray-500">
          <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
            {name}
          </span>
          Beacon node has been created successfully, and will be up and running
          in few seconds.
        </p>
      </NotificationPanel>
    </Layout>
  );
}

export default Beaconnodes;
