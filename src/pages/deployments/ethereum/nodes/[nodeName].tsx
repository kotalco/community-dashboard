import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useNode } from '@utils/requests/ethereum';
import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DeleteEthereumNode from '@components/organisms/Ethereum/DeleteEthereumNode/DeleteEthereumNode';
import NetworkingDetails from '@components/organisms/Ethereum/Networking/Networking';
import APIDetails from '@components/organisms/Ethereum/APIDetails/APIDetails';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { getClientLabel } from '@data/ethereum/node/clientOptions';
import { getNetworkLabel } from '@data/ethereum/node/networkOptions';
import { Tab } from '@headlessui/react';
import { fetcher } from '@utils/axios';

interface Props {
  initialNode?: EthereumNode;
}

const EthereumNodeDetailsPage: React.FC<Props> = ({ initialNode }) => {
  const { isFallback } = useRouter();

  const { data: node } = useNode(initialNode?.name, {
    initialData: { node: initialNode },
  });

  if (!node || isFallback) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum' },
    { label: 'Chain', value: getNetworkLabel(node.network) },
    { label: 'Client', value: getClientLabel(node.client) },
  ];

  return (
    <Layout>
      <Heading title={node.name} />

      <div className="bg-white shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles}>
          <Tab.Panel className="focus:outline-none">
            <ProtocolDetails dataList={dataList} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <NetworkingDetails
              name={node.name}
              p2pPort={node.p2pPort}
              syncMode={node.syncMode}
              bootnodes={node.bootnodes}
              staticNodes={node.staticNodes}
            />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <APIDetails
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
