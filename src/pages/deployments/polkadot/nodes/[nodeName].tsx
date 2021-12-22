import { useRouter } from 'next/router';

import Heading from '@components/templates/Heading/Heading';
import Tabs from '@components/organisms/Tabs/Tabs';
import Layout from '@components/templates/Layout/Layout';
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator';
import ProtocolDetails from '@components/organisms/ProtocolDetails/ProtocolDetails';
import DeleteChainlinkNode from '@components/organisms/Chainlink/DeleteChainlinkNode/DeleteChainlinkNode';
import AccessControlDetails from '@components/organisms/Polkadot/AccessControl/AccessControl';
import ResourcesDetails from '@components/organisms/Resources/Resources';
import LoggingDetails from '@components/organisms/Chainlink/LoggingDetails/LoggingDetails';
import DatabaseDetails from '@components/organisms/Chainlink/DatabaseDetails/DatabaseDetails';
import EthereumDetails from '@components/organisms/Chainlink/EthereumDetails/EthereumDetails';
import WalletDetails from '@components/organisms/Chainlink/WalletDetails/WalletDetails';
import TLSDetails from '@components/organisms/Chainlink/TLSDetails/TLSDetails';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { Resources } from '@interfaces/Resources';
import { getLabel } from '@utils/helpers/getLabel';
import { useChainlinkNode } from '@hooks/useChainlinkNode';
import { TITLES } from '@data/polkadot/tabTitles';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import { useStatus } from '@hooks/useStatus';
import { usePolkadotNode } from '@hooks/usePolkadotNode';
import { NETWORKS } from '@data/polkadot/networks';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import NetworkingDetails from '@components/organisms/Polkadot/Networking/Networking';
import Validatordetails from '@components/organisms/Polkadot/Validator/Validator';
import TelemetryDetails from '@components/organisms/Polkadot/Telemetry/Telemetry';
import PrometheusDetails from '@components/organisms/Polkadot/Prometheus/Prometheus';
import APIDetails from '@components/organisms/Polkadot/API/API';

function PolkadotNode() {
  const { query, push } = useRouter();
  const nodeName = query.nodeName as string | undefined;
  const { status } = useStatus(
    nodeName && `/polkadot/nodes/${nodeName}/status`
  );
  const { node, mutate, error } = usePolkadotNode(nodeName);

  const updateResources = async (name: string, values: Resources) => {
    await updatePolkadotNode(values, name);
    mutate();
  };

  if (error) {
    console.log(error);
    return <LoadingIndicator />;
  }
  if (!node) return <LoadingIndicator />;

  const dataList = [
    { label: 'Protocol', value: 'Polkadot' },
    {
      label: 'Network',
      value: getLabel(node.network, NETWORKS),
    },
    { label: 'Client', value: 'Parity Polkadot' },
  ];
  // console.log(node);
  return (
    <Layout>
      <Heading title={node.name} status={status} createdDate={node.createdAt} />

      <div className="bg-white rounded-lg shadow divided-y divided-gray-200">
        <Tabs mutate={mutate} tabs={TITLES}>
          {/* Protocol */}
          <ProtocolDetails dataList={dataList} />

          {/* Networking */}
          <NetworkingDetails {...node} />

          {/* Validator */}
          <Validatordetails {...node} />

          {/* Telemetry */}
          <TelemetryDetails {...node} />

          {/* Prometheus */}
          <PrometheusDetails {...node} />

          {/* API */}
          <APIDetails {...node} />

          {/* Access Control */}
          <AccessControlDetails {...node} />

          {/* Logging */}
          {/* <LoggingDetails
            logging={node.logging}
            name={node.name}
            setNode={mutate}
          /> */}

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
          {/* <DeleteChainlinkNode nodeName={node.name} /> */}
        </Tabs>
      </div>
    </Layout>
  );
}

export default PolkadotNode;
