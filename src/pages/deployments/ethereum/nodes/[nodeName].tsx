import { useRouter } from 'next/router';

import { updateEthereumNode } from '@utils/requests/ethereum';
import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DeleteEthereumNode from '@components/organisms/Ethereum/DeleteEthereumNode/DeleteEthereumNode';
import NetworkingDetails from '@components/organisms/Ethereum/Networking/Networking';
import APIDetails from '@components/organisms/Ethereum/APIDetails/APIDetails';
import AccessControlDetails from '@components/organisms/Ethereum/AccessControlDetails/AccessControlDetails';
import MiningDetails from '@components/organisms/Ethereum/MiningDetails/MiningDetails';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Ethereum/LogginDetails/LoggingDetails';
import { Resources } from '@interfaces/Resources';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { getLabel } from '@utils/helpers/getLabel';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { useStatus } from '@hooks/useStatus';
import { useEthereumNode } from '@hooks/useEthereumNode';

function EthereumNodeDetailsPage() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;

  const { node, mutate, error } = useEthereumNode(nodeName);
  const { status } = useStatus(node && `/ethereum/nodes/${node.name}/status`);

  const updateResources = async (name: string, values: Resources) => {
    await updateEthereumNode(values, name);
    mutate();
  };

  if (error) push('/404');
  if (!node) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum' },
    { label: 'Chain', value: getLabel(node.network, networkOptions) },
    { label: 'Client', value: getLabel(node.client, clientOptions) },
  ];

  return (
    <Layout>
      <Heading title={node.name} status={status} createdDate={node.createdAt} />

      <div className="bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs tabs={tabTitles(node.client)}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Networking */}
          <NetworkingDetails
            client={node.client}
            name={node.name}
            p2pPort={node.p2pPort}
            syncMode={node.syncMode}
            bootnodes={node.bootnodes}
            staticNodes={node.staticNodes}
            nodePrivateKeySecretName={node.nodePrivateKeySecretName}
            setNode={mutate}
          />

          {/* API */}
          <APIDetails
            miner={node.miner}
            client={node.client}
            rpc={node.rpc}
            rpcPort={node.rpcPort}
            rpcAPI={node.rpcAPI}
            ws={node.ws}
            wsPort={node.wsPort}
            wsAPI={node.wsAPI}
            graphql={node.graphql}
            graphqlPort={node.graphqlPort}
            name={node.name}
            setNode={mutate}
          />

          {/* Access Control */}
          {node.client !== EthereumNodeClient.nethermind && (
            <AccessControlDetails
              hosts={node.hosts}
              corsDomains={node.corsDomains}
              name={node.name}
              setNode={mutate}
            />
          )}

          {/* Mining */}
          <MiningDetails
            rpc={node.rpc}
            ws={node.ws}
            graphql={node.graphql}
            client={node.client}
            miner={node.miner}
            coinbase={node.coinbase}
            import={node.import}
            name={node.name}
            setNode={mutate}
          />

          {/* Logging */}
          <LoggingDetails
            client={node.client}
            logging={node.logging}
            name={node.name}
            setNode={mutate}
          />

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
          <DeleteEthereumNode nodeName={node.name} />
        </Tabs>
      </div>
    </Layout>
  );
}

export default EthereumNodeDetailsPage;
