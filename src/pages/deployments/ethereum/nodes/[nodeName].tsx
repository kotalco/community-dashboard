import { NextPage } from 'next';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/Ethereum/DangerZone/DangerZone';
import NetworkingDetails from '@components/organisms/Ethereum/Networking/Networking';
import APIDetails from '@components/organisms/Ethereum/APIDetails/APIDetails';
import AccessControlDetails from '@components/organisms/Ethereum/AccessControlDetails/AccessControlDetails';
import MiningDetails from '@components/organisms/Ethereum/MiningDetails/MiningDetails';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Ethereum/LogginDetails/LoggingDetails';
import Cards from '@components/templates/Cards/Cards';
import Card from '@components/atoms/Card/Card';
import withParams from '@components/hoc/withParams/withParams';
import { Resources } from '@interfaces/Resources';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { getLabel } from '@utils/helpers/getLabel';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { getHref } from '@utils/helpers/getHref';
import { useStats } from '@hooks/useStats';
import { EthereumStatsResponse } from '@interfaces/Stats';
import { ExclamationIcon, RefreshIcon } from '@heroicons/react/outline';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { PageWithParams } from '@interfaces/PageWithParams';

const EthereumNodeDetailsPage: NextPage<PageWithParams<EthereumNode>> = ({
  data: node,
  mutate,
}) => {
  const { stats, error: statsError } = useStats<EthereumStatsResponse>(
    `/ethereum/nodes/${node.name}/stats`
  );
  const { status } = useStatus(`/ethereum/nodes/${node.name}/status`);

  // Update Resources Funtion
  const updateResources = async (name: string, values: Resources) => {
    await updateEthereumNode(values, name);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Ethereum' },
    { label: 'Chain', value: getLabel(node.network, networkOptions) },
    {
      label: 'Client',
      value: getLabel(node.client, clientOptions),
      href: getHref(node.client),
    },
  ];

  return (
    <Layout>
      <Heading title={node.name} status={status} createdDate={node.createdAt} />
      {/* Stats Cards */}
      <Cards error={statsError?.error}>
        {stats && (
          <>
            <Card
              title="Blocks"
              tooltipTitle={`${(
                (stats.currentBlock / stats.highestBlock) *
                100
              ).toFixed(2)}%`}
            >
              <div className="flex items-center space-x-1">
                {stats?.peersCount ? (
                  <RefreshIcon className="w-3 h-3 text-gray-700 animate-spin" />
                ) : (
                  <ExclamationIcon className="w-4 h-4 text-yellow-500" />
                )}
                <span>
                  {new Intl.NumberFormat('en-US').format(stats.currentBlock)}
                </span>
              </div>
            </Card>
            <Card title="Peers">{stats?.peersCount}</Card>
          </>
        )}
      </Cards>

      <div className="bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={tabTitles(node.client)} mutate={mutate}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Networking */}
          <NetworkingDetails {...node} />

          {/* API */}
          <APIDetails {...node} />

          {/* Access Control */}
          {node.client !== EthereumNodeClient.nethermind && (
            <AccessControlDetails {...node} />
          )}

          {/* Mining */}
          <MiningDetails {...node} />

          {/* Logging */}
          <LoggingDetails {...node} />

          {/* Resources */}
          <ResourcesDetails
            cpu={node.cpu}
            cpuLimit={node.cpuLimit}
            memory={node.memory}
            memoryLimit={node.memoryLimit}
            storage={node.storage}
            name={node.name}
            updateResources={updateResources}
          />

          {/* Danger Zone */}
          <DangerZone resourceName={node.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(EthereumNodeDetailsPage, {
  params: 'nodeName',
  url: '/ethereum/nodes',
});
