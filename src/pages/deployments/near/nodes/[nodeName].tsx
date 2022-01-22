import { useRouter } from 'next/router';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import RPCDetails from '@components/organisms/Near/RPC/RPC';
import DangerZone from '@components/organisms/Filecoin/DangerZone/DangerZone';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Filecoin/Logging/Logging';
import ValidatorDetails from '@components/organisms/Near/Validator/Validator';
import NetworkingDetails from '@components/organisms/Near/Networking/Networking';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/near/tabTitles';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { NETWORKS } from '@data/near/networks';
import { useNearNode } from '@hooks/useNearNode';
import { updateNearNode } from '@utils/requests/near';

function NearNode() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;
  const { status } = useStatus(nodeName && `/near/nodes/${nodeName}/status`);
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

          {/* Telemetry */}

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
}

export default NearNode;
