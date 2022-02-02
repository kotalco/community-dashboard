import { useRouter } from 'next/router';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import RPCDetails from '@components/organisms/Near/RPC/RPC';
import DangerZone from '@components/organisms/Near/DangerZone/DangerZone';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import ValidatorDetails from '@components/organisms/Near/Validator/Validator';
import NetworkingDetails from '@components/organisms/Near/Networking/Networking';
import PrometheusDetails from '@components/organisms/Near/Prometheus/Prometheus';
import TelemetryDetails from '@components/organisms/Near/Telemetry/Telemetry';
import Logging from '@components/organisms/Logging/Logging';
import Cards from '@components/templates/Cards/Cards';
import Card from '@components/atoms/Card/Card';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/near/tabTitles';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { NETWORKS } from '@data/near/networks';
import { useNearNode } from '@hooks/useNearNode';
import { updateNearNode } from '@utils/requests/near';
import { useStats } from '@hooks/useStats';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { ExclamationIcon } from '@heroicons/react/solid';
import { getMigaOrKiloBit } from '@utils/helpers/getMegaOrKiloBit';

function NearNode() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;
  const { status } = useStatus(nodeName && `/near/nodes/${nodeName}/status`);
  const { stats, error: statsError } = useStats(
    nodeName && `/near/nodes/${nodeName}/stats`
  );
  const { node, mutate, error } = useNearNode(nodeName);

  const updateResources = async (name: string, values: Resources) => {
    await updateNearNode(values, name);
    mutate();
  };

  if (error) push('/404');
  if (!node) return <LoadingIndicator />;

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'NEAR' },
    {
      label: 'Network',
      value: getLabel(node.network, NETWORKS),
    },

    {
      label: 'Client',
      value: 'nearcore',
      href: 'https://github.com/near/nearcore',
    },
  ];

  return (
    <Layout>
      <Heading title={node.name} status={status} createdDate={node.createdAt} />

      {/* Stats Cards */}
      <Cards error={statsError?.error}>
        <Card
          title="Blocks"
          tooltipTitle="If block number doesn't change, it means node is not syncing or syncing headers"
        >
          <div className="flex items-center space-x-1">
            {stats?.syncing ? (
              <RefreshIcon className="w-3 h-3 text-gray-700 animate-spin" />
            ) : (
              <ExclamationIcon className="w-4 h-4 text-yellow-500" />
            )}
            <span>{stats?.latestBlockHeight}</span>
          </div>
        </Card>
        <Card title="Peers" tooltipTitle="Active peers / out of max peers">
          {stats?.activePeersCount}/{stats?.maxPeersCount}
        </Card>
        <Card title="Bandwidth" tooltipTitle="Download and upload speed">
          <div className="flex items-center space-x-1">
            <span>
              <ArrowDownIcon className="w-3 h-3" />
            </span>
            <span>{getMigaOrKiloBit(stats?.receivedBytesPerSecond)}</span>
            <span>/</span>{' '}
            <span>
              <ArrowUpIcon className="w-3 h-3" />
            </span>
            <span>{getMigaOrKiloBit(stats?.sentBytesPerSecond)}</span>
          </div>
        </Card>
      </Cards>

      <div className="bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={TITLES} mutate={mutate}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Networking */}
          <NetworkingDetails {...node} />

          {/* RPC */}
          <RPCDetails {...node} />

          {/* Validator */}
          <ValidatorDetails {...node} />

          {/* Prometheus */}
          <PrometheusDetails {...node} />

          {/* Telemetry */}
          <TelemetryDetails {...node} />

          {/* Logging */}
          <Logging wsUrl={`/near/nodes/${node.name}/logs`} />

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
}

export default NearNode;
