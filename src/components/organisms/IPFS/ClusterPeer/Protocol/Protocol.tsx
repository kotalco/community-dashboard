import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';

interface Props {
  consensus: ClusterConsensusAlgorithm;
  id: string;
  privatekeySecretName: string;
}

const Protocol: React.FC<Props> = ({ consensus, id, privatekeySecretName }) => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dl>
        <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
        <dd className="text-gray-500 text-sm">IPFS Cluster</dd>
      </dl>
      <dl>
        <dt className="block text-sm font-medium text-gray-700 mt-4">
          Consensus
        </dt>
        <dd className="text-gray-500 text-sm">{consensus}</dd>
      </dl>
      <dl>
        <dt className="block text-sm font-medium text-gray-700 mt-4">Client</dt>
        <dd className="text-gray-500 text-sm">go-ipfs-cluster</dd>
      </dl>
      {id && privatekeySecretName && (
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            ID: {id}
          </dt>
          <dd className="text-gray-500 text-sm">
            From: {privatekeySecretName}
          </dd>
        </dl>
      )}
    </div>
  );
};

export default Protocol;
