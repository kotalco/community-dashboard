import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import {
  updateBeaconNode,
  useBeaconnode,
} from '@utils/requests/ethereum2/beaconNodes';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab';
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab';
import DeleteBeaconNode from '@components/organisms/Ethereum2/BeaconNode/DeleteBeaconNode/DeleteBeaconNode';
import Resources from '@components/organisms/Resources/Resources';
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { BeaconNode, UpdateBeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { fetcher } from '@utils/axios';
import React from 'react';
import Heading from '@components/templates/Heading/Heading';
import { getLabel } from '@utils/helpers/getLabel';
import Logging from '@components/organisms/Logging/Logging';

interface Props {
  beaconnode?: BeaconNode;
}

const Ethereum2NodeDetailsPage: React.FC<Props> = ({ beaconnode }) => {
  const { isFallback } = useRouter();
  const { data, mutate } = useBeaconnode(beaconnode?.name, {
    fallbackData: { beaconnode },
  });

  const updateResources = async (name: string, values: UpdateBeaconNode) => {
    const beaconnode = await updateBeaconNode(name, values);
    void mutate({ beaconnode });
  };

  if (!data || isFallback) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Ethereum 2.0' },
    { label: 'Chain', value: getLabel(data.network, networkOptions) },
    { label: 'Client', value: getLabel(data.client, clientOptions) },
  ];
  return (
    <Layout>
      <Heading title={data.name} />

      <div className="bg-white shadow rounded-lg mt-4">
        <Tabs tabs={tabTitles}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Ethereum */}
          <BeaconNodeEthereumTab
            name={data.name}
            client={data.client}
            eth1Endpoints={data.eth1Endpoints}
            network={data.network}
          />

          {/* API */}
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

          {/* Logging */}
          <Logging wsUrl={`/ethereum2/beaconnodes/${data.name}/logs`} />

          {/* Resources */}
          <Resources
            name={data.name}
            cpu={data.cpu}
            cpuLimit={data.cpuLimit}
            memory={data.memory}
            memoryLimit={data.memoryLimit}
            storage={data.storage}
            updateResources={updateResources}
          />

          {/* Danger zone */}
          <DeleteBeaconNode nodeName={data.name} />
        </Tabs>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string;
  try {
    const { beaconnode } = await fetcher<{ beaconnode: BeaconNode }>(
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
