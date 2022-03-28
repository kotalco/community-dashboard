import { NextPage } from 'next';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DangerZone from '@components/organisms/Chainlink/DangerZone/DangerZone';
import APIDetails from '@components/organisms/Chainlink/APIDetails/APIDetails';
import AccessControlDetails from '@components/organisms/Chainlink/AccessControlDetails/AccessControlDetails';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Chainlink/LoggingDetails/LoggingDetails';
import DatabaseDetails from '@components/organisms/Chainlink/DatabaseDetails/DatabaseDetails';
import EthereumDetails from '@components/organisms/Chainlink/EthereumDetails/EthereumDetails';
import WalletDetails from '@components/organisms/Chainlink/WalletDetails/WalletDetails';
import TLSDetails from '@components/organisms/Chainlink/TLSDetails/TLSDetails';
import withParams from '@components/hoc/withParams/withParams';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { TITLES } from '@data/chainlink/tabTitles';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import { useStatus } from '@hooks/useStatus';
import { DataList } from '@interfaces/DataList';
import { ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { PageWithParams } from '@interfaces/PageWithParams';

const ChainlinkNodeDetailsPage: NextPage<PageWithParams<ChainlinkNode>> = ({
  data: node,
  mutate,
}) => {
  const { status } = useStatus(`/chainlink/nodes/${node.name}/status`);

  const updateResources = async (name: string, values: Resources) => {
    await updateChainlinkNode(values, name);
    mutate();
  };

  const dataList: DataList[] = [
    { label: 'Protocol', value: 'Chainlink' },
    {
      label: 'EVM Chain',
      value: getLabel(
        `${node.ethereumChainId}:${node.linkContractAddress}`,
        EVM_CHAINS
      ),
    },
    { label: 'Chain ID', value: node.ethereumChainId },
    { label: 'Link Contact Address', value: node.linkContractAddress },
    {
      label: 'Client',
      value: 'Chainlink',
      href: 'https://github.com/smartcontractkit/chainlink',
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
          <DatabaseDetails {...node} />

          {/* Ethereum */}
          <EthereumDetails {...node} />

          {/* Wallet */}
          <WalletDetails {...node} />

          {/* TLS */}
          <TLSDetails {...node} />

          {/* API Credentials */}
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

export default withParams(ChainlinkNodeDetailsPage, {
  params: 'nodeName',
  url: '/chainlink/nodes',
});
