import { NextPage } from 'next';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/Filecoin/DangerZone/DangerZone';
import APIDetails from '@components/organisms/Filecoin/API/API';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Filecoin/Logging/Logging';
import IPFSDetails from '@components/organisms/Filecoin/IPFS/IPFS';
import withParams from '@components/hoc/withParams/withParams';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/filecoin/tabTitles';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import { NETWORKS } from '@data/filecoin/networks';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { PageWithParams } from '@interfaces/PageWithParams';

const FilecoinNodeDetailsPage: NextPage<PageWithParams<FilecoinNode>> = ({
  data: node,
  mutate,
}) => {
  const { status } = useStatus(`/filecoin/nodes/${node.name}/status`);

  const updateResources = async (name: string, values: Resources) => {
    await updateFilecoinNode(values, name);
    mutate();
  };

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
};

export default withParams(FilecoinNodeDetailsPage, {
  params: 'nodeName',
  url: '/filecoin/nodes',
});
