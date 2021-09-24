import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { updateEthereumNode, useNode } from '@utils/requests/ethereum';
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
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { Tab } from '@headlessui/react';
import { fetcher } from '@utils/axios';
import { getLabel } from '@utils/helpers/getLabel';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

interface Props {
  initialNode?: EthereumNode;
}

const EthereumNodeDetailsPage: React.FC<Props> = ({ initialNode }) => {
  const { isFallback } = useRouter();

  const { data: node, mutate } = useNode(initialNode?.name, {
    fallbackData: { node: initialNode },
  });

  const updateResources = async (name: string, values: Resources) => {
    const node = await updateEthereumNode(name, values);
    void mutate({ node });
  };

  if (!node || isFallback) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum' },
    { label: 'Chain', value: getLabel(node.network, networkOptions) },
    { label: 'Client', value: getLabel(node.client, clientOptions) },
  ];

  return (
    <Layout>
      <Heading title={node.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles(node.client)}>
          {/* Protocol */}
          <Tab.Panel className="focus:outline-none">
            <ProtocolDetails dataList={dataList} />
          </Tab.Panel>

          {/* Networking */}
          <Tab.Panel className="focus:outline-none">
            <NetworkingDetails
              client={node.client}
              name={node.name}
              p2pPort={node.p2pPort}
              syncMode={node.syncMode}
              bootnodes={node.bootnodes}
              staticNodes={node.staticNodes}
              nodePrivateKeySecretName={node.nodePrivateKeySecretName}
            />
          </Tab.Panel>

          {/* API */}
          <Tab.Panel className="focus:outline-none">
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
            />
          </Tab.Panel>

          {/* Access Control */}
          {node.client !== EthereumNodeClient.nethermind && (
            <Tab.Panel className="focus:outline-none">
              <AccessControlDetails
                hosts={node.hosts}
                corsDomains={node.corsDomains}
                name={node.name}
              />
            </Tab.Panel>
          )}

          {/* Mining */}
          <Tab.Panel className="focus:outline-none">
            <MiningDetails
              rpc={node.rpc}
              ws={node.ws}
              graphql={node.graphql}
              client={node.client}
              miner={node.miner}
              coinbase={node.coinbase}
              import={node.import}
              name={node.name}
            />
          </Tab.Panel>

          {/* Logging */}
          <Tab.Panel className="focus:outline-none">
            <LoggingDetails
              client={node.client}
              logging={node.logging}
              name={node.name}
            />
          </Tab.Panel>

          {/* Resources */}
          <Tab.Panel className="focus:outline-none">
            <ResourcesDetails
              cpu={node.cpu}
              cpuLimit={node.cpuLimit}
              memory={node.memory}
              memoryLimit={node.memoryLimit}
              storage={node.storage}
              name={node.name}
              updateResources={updateResources}
            />
          </Tab.Panel>

          {/* Danger Zone */}
          <Tab.Panel className="focus:outline-none">
            <DeleteEthereumNode nodeName={node.name} />
          </Tab.Panel>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string;
  try {
    const { node } = await fetcher<{ node: EthereumNode }>(
      `/ethereum/nodes/${nodeName}`
    );
    return { props: { initialNode: node }, revalidate: 10 };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default EthereumNodeDetailsPage;
