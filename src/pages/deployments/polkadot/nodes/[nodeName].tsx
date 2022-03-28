import { ExclamationIcon, RefreshIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/Polkadot/DangerZone/DangerZone';
import AccessControlDetails from '@components/organisms/Polkadot/AccessControl/AccessControl';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Polkadot/Logging/Logging';
import NetworkingDetails from '@components/organisms/Polkadot/Networking/Networking';
import Validatordetails from '@components/organisms/Polkadot/Validator/Validator';
import TelemetryDetails from '@components/organisms/Polkadot/Telemetry/Telemetry';
import PrometheusDetails from '@components/organisms/Polkadot/Prometheus/Prometheus';
import APIDetails from '@components/organisms/Polkadot/API/API';
import Cards from '@components/templates/Cards/Cards';
import Card from '@components/atoms/Card/Card';
import withParams from '@components/hoc/withParams/withParams';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/polkadot/tabTitles';
import { useStatus } from '@hooks/useStatus';
import { NETWORKS } from '@data/polkadot/networks';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { DataList } from '@interfaces/DataList';
import { useStats } from '@hooks/useStats';
import { PolkadotStatsResponse } from '@interfaces/Stats';
import { PolkadotNode } from '@interfaces/polkadot/PolkadotNode';
import { PageWithParams } from '@interfaces/PageWithParams';

const PolkadotNodeDetailsPage: NextPage<PageWithParams<PolkadotNode>> = ({
  data: node,
  mutate,
}) => {
  const { status } = useStatus(`/polkadot/nodes/${node.name}/status`);
  const { stats, error: statsError } = useStats<PolkadotStatsResponse>(
    `/polkadot/nodes/${node.name}/stats`
  );

  const updateResources = async (name: string, values: Resources) => {
    await updatePolkadotNode(values, name);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Polkadot' },
    {
      label: 'Network',
      value: getLabel(node.network, NETWORKS),
    },
    {
      label: 'Client',
      value: 'Parity Polkadot',
      href: 'https://github.com/paritytech/polkadot',
    },
  ];

  return (
    <Layout>
      <Heading title={node.name} status={status} createdDate={node.createdAt} />
      {/* Stats Cards */}
      {stats && (
        <Cards error={statsError?.error}>
          <Card
            title="Blocks"
            tooltipTitle={`${(
              (stats.currentBlock / stats.highestBlock) *
              100
            ).toFixed(2)}%`}
          >
            <div className="flex items-center space-x-1">
              {stats?.syncing ? (
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
        </Cards>
      )}

      <div className="bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs mutate={mutate} tabs={TITLES}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Networking */}
          <NetworkingDetails {...node} />

          {/* Validator */}
          <Validatordetails {...node} />

          {/* Telemetry */}
          <TelemetryDetails {...node} />

          {/* Prometheus */}
          <PrometheusDetails {...node} />

          {/* API */}
          <APIDetails {...node} />

          {/* Access Control */}
          <AccessControlDetails {...node} />

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
          <DangerZone nodeName={node.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default withParams(PolkadotNodeDetailsPage, {
  params: 'nodeName',
  url: '/polkadot/nodes',
});
