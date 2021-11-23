import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

import { updateEthereumNode, useNode } from '@utils/requests/ethereum';
import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DeleteEthereumNode from '@components/organisms/Ethereum/DeleteEthereumNode/DeleteEthereumNode';
import NetworkingDetails from '@components/organisms/Ethereum/Networking/Networking';
import APIDetails from '@components/organisms/Chainlink/APIDetails/APIDetails';
import AccessControlDetails from '@components/organisms/Chainlink/AccessControlDetails/AccessControlDetails';
import MiningDetails from '@components/organisms/Ethereum/MiningDetails/MiningDetails';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Ethereum/LogginDetails/LoggingDetails';
import { Resources } from '@interfaces/Resources';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { fetcher } from '@utils/axios';
import { getLabel } from '@utils/helpers/getLabel';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { useChainlinkNode } from '@hooks/useChainlinkNode';
import { titles } from '@data/chainlink/tabTitles';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import DatabaseDetails from '@components/organisms/Chainlink/DatabaseDetails/DatabaseDetails';
import EthereumDetails from '@components/organisms/Chainlink/EthereumDetails/EthereumDetails';
import WalletDetails from '@components/organisms/Chainlink/WalletDetails/WalletDetails';
import TLSDetails from '@components/organisms/Chainlink/TLSDetails/TLSDetails';

function ChainlinkNode() {
  const { query } = useRouter();
  const nodeName = query.nodeName as string | undefined;

  const { node, mutate } = useChainlinkNode(nodeName);

  // const updateResources = async (name: string, values: Resources) => {
  //   const node = await updateEthereumNode(name, values);
  //   void mutate({ node });
  // };

  if (!node) return <LoadingIndicator />;

  const dataList = [
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
    { label: 'Client', value: 'Chainlink' },
  ];

  return (
    <Layout>
      <Heading title={node.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200">
        <Tabs tabs={titles}>
          {/* Protocol */}
          <Tab.Panel className="focus:outline-none">
            <ProtocolDetails dataList={dataList} />
          </Tab.Panel>

          {/* Networking */}
          <Tab.Panel className="focus:outline-none">
            <DatabaseDetails
              databaseURL={node.databaseURL}
              name={node.name}
              setNode={mutate}
            />
          </Tab.Panel>

          {/* Ethereum */}
          <Tab.Panel className="focus:outline-none">
            <EthereumDetails
              name={node.name}
              setNode={mutate}
              ethereumWsEndpoint={node.ethereumWsEndpoint}
              ethereumHttpEndpoints={node.ethereumHttpEndpoints}
            />
          </Tab.Panel>

          {/* Wallet */}
          <Tab.Panel className="focus:outline-none">
            <WalletDetails
              name={node.name}
              setNode={mutate}
              keystorePasswordSecretName={node.keystorePasswordSecretName}
            />
          </Tab.Panel>

          {/* TLS */}
          <Tab.Panel className="focus:outline-none">
            <TLSDetails
              name={node.name}
              setNode={mutate}
              certSecretName={node.certSecretName}
              secureCookies={node.secureCookies}
              tlsPort={node.tlsPort}
            />
          </Tab.Panel>

          {/* API Credentials */}
          <Tab.Panel className="focus:outline-none">
            <APIDetails
              name={node.name}
              setNode={mutate}
              apiCredentials={node.apiCredentials}
            />
          </Tab.Panel>

          {/* Access Control */}
          <Tab.Panel className="focus:outline-none">
            <AccessControlDetails
              corsDomains={node.corsDomains}
              setNode={mutate}
              name={node.name}
            />
          </Tab.Panel>

          {/* Logging */}
          {/* <Tab.Panel className="focus:outline-none">
            <LoggingDetails
              client={node.client}
              logging={node.logging}
              name={node.name}
            />
          </Tab.Panel> */}

          {/* Resources */}
          {/* <Tab.Panel className="focus:outline-none">
            <ResourcesDetails
              cpu={node.cpu}
              cpuLimit={node.cpuLimit}
              memory={node.memory}
              memoryLimit={node.memoryLimit}
              storage={node.storage}
              name={node.name}
              updateResources={updateResources}
            />
          </Tab.Panel> */}

          {/* Danger Zone */}
          {/* <Tab.Panel className="focus:outline-none">
            <DeleteEthereumNode nodeName={node.name} />
          </Tab.Panel> */}
        </Tabs>
      </div>
    </Layout>
  );
}

export default ChainlinkNode;
