import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getEthereumNode } from '@utils/requests/ethereumNodeRequests';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import EthereumNodeDetails from '@components/organisms/Ethereum/EthereumNodeDetails/EthereumNodeDetails';
import DeleteEthereumNode from '@components/organisms/Ethereum/DeleteEthereumNode/DeleteEthereumNode';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { tabTitles } from '@data/ethereum/node/tabTitles';
import { Tab } from '@headlessui/react';

interface Props {
  ethereumNode: EthereumNode;
}

const EthereumNodeDetailsPage: React.FC<Props> = ({ ethereumNode }) => {
  const { isFallback, query } = useRouter();
  const { nodeName } = query;

  const { data } = useSWR(
    typeof nodeName === 'string' ? nodeName : null,
    getEthereumNode,
    {
      initialData: ethereumNode,
      revalidateOnMount: true,
    }
  );

  if (!data || isFallback) return <LoadingIndicator />;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">{ethereumNode.name}</h1>

      <div className="bg-white overflow-hidden shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs tabs={tabTitles}>
          <Tab.Panel className="focus:outline-none">
            <EthereumNodeDetails node={data} />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <DeleteEthereumNode nodeName={data.name} />
          </Tab.Panel>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string;
  try {
    const ethereumNode = await getEthereumNode(nodeName);
    return { props: { ethereumNode }, revalidate: 10 };
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
