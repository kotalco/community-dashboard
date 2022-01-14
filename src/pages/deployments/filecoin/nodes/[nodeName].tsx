import { useRouter } from 'next/router';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/Filecoin/DangerZone/DangerZone';
import APIDetails from '@components/organisms/Filecoin/API/API';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Filecoin/Logging/Logging';
import NetworkingDetails from '@components/organisms/Filecoin/Networking/Networking';
import IPFSDetails from '@components/organisms/Filecoin/IPFS/IPFS';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/chainlink/tabTitles';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { useFilecoinNode } from '@hooks/useFilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import { NETWORKS } from '@data/filecoin/networks';

function FilecoinNode() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;
  const { status } = useStatus(
    nodeName && `/filecoin/nodes/${nodeName}/status`
  );
  const { node, mutate, error } = useFilecoinNode(nodeName);

  const updateResources = async (name: string, values: Resources) => {
    await updateFilecoinNode(values, name);
    mutate();
  };

  if (error) push('/404');
  if (!node) return <LoadingIndicator />;

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Filecoin' },
    {
      label: 'Network',
      value: getLabel(node.network, NETWORKS),
    },

    {
      label: 'Client',
      value: 'Lotus',
      href: 'https://github.com/filecoin-project/lotus',
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

          {/* API */}
          <APIDetails {...node} />

          {/* IPFS */}
          <IPFSDetails {...node} />

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

export default FilecoinNode;
