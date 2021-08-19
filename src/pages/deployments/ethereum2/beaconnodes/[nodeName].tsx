import { GetStaticPaths, GetStaticProps } from 'next';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';

import {
  updateBeaconNode,
  useBeaconnode,
} from '@utils/requests/ethereum2/beaconNodes';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import BeaconNodeProtocolTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeProtocolTab/BeaconNodeProtocolTab';
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab';
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab';
import DeleteBeaconNode from '@components/organisms/Ethereum2/BeaconNode/DeleteBeaconNode/DeleteBeaconNode';
import Resources from '@components/organisms/Resources/Resources';
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles';
import {
  Ethereum2BeaconNode,
  UpdateEthereum2BeaconNode,
} from '@interfaces/ethereum2/Ethereum2BeaconNode';
import { fetcher } from '@utils/axios';
import React from 'react';
import Heading from '@components/templates/Heading/Heading';

interface Props {
  beaconnode?: Ethereum2BeaconNode;
}

const Ethereum2NodeDetailsPage: React.FC<Props> = ({ beaconnode }) => {
  const { isFallback } = useRouter();
  const { data, mutate } = useBeaconnode(beaconnode?.name, {
    initialData: { beaconnode },
  });

  const updateResources = async (
    name: string,
    values: UpdateEthereum2BeaconNode
  ) => {
    const beaconnode = await updateBeaconNode(name, values);
    void mutate({ beaconnode });
  };

  if (!data || isFallback) return <LoadingIndicator />;

  return (
    <Layout>
      <Heading title={data.name} />

      <div className="bg-white shadow rounded-lg mt-4">
        <Tabs tabs={tabTitles}>
          <Tab.Panel>
            <BeaconNodeProtocolTab
              client={data.client}
              network={data.network}
            />
          </Tab.Panel>
          <Tab.Panel>
            <BeaconNodeEthereumTab
              name={data.name}
              client={data.client}
              eth1Endpoints={data.eth1Endpoints}
              network={data.network}
            />
          </Tab.Panel>

          <Tab.Panel>
            <BeaconNodeAPITab
              name={data.name}
              rest={data.rest}
              restHost={data.restHost}
              restPort={data.restPort}
              rpc={data.rpc}
              rpcPort={data.rpcPort}
              rpcHost={data.rpcHost}
              grpc={data.grpc}
              grpcHost={data.grpcHost}
              grpcPort={data.grpcPort}
              client={data.client}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Resources
              name={data.name}
              cpu={data.cpu}
              cpuLimit={data.cpuLimit}
              memory={data.memory}
              memoryLimit={data.memoryLimit}
              storage={data.storage}
              updateResources={updateResources}
            />
          </Tab.Panel>
          <Tab.Panel>
            <DeleteBeaconNode nodeName={data.name} />
          </Tab.Panel>
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string;
  try {
    const { beaconnode } = await fetcher<{ beaconnode: Ethereum2BeaconNode }>(
      `/ethereum2/beaconnodes/${nodeName}`
    );
    return { props: { beaconnode }, revalidate: 10 };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default Ethereum2NodeDetailsPage;
