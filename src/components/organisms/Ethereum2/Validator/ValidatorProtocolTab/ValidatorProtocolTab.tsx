import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients';

interface Props {
  client: ValidatorsClients;
  network: string;
}

const ValidatorProtocolTab: React.FC<Props> = ({ client, network }) => {
  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Ethereum 2.0</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Chain
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{network}</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Client
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{client}</span>
          </dd>
        </dl>
      </div>
    </>
  );
};

export default ValidatorProtocolTab;
