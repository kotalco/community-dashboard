import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';

interface Props {
  client: BeaconNodeClient;
  network: string;
}

const BeaconNodeProtocolTab: React.FC<Props> = ({ client, network }) => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dl>
        <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
        <dd className="text-gray-500 text-sm">Ethereum 2.0</dd>
      </dl>
      <dl>
        <dt className="block text-sm font-medium text-gray-700 mt-4">Chain</dt>
        <dd className="text-gray-500 text-sm">{network}</dd>
      </dl>
      <dl>
        <dt className="block text-sm font-medium text-gray-700 mt-4">Client</dt>
        <dd className="text-gray-500 text-sm">{client}</dd>
      </dl>
    </div>
  );
};

export default BeaconNodeProtocolTab;
