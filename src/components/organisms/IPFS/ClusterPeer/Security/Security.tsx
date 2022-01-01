import { ClusterPeer, Security } from '@interfaces/ipfs/ClusterPeer';
import { KeyedMutator } from 'swr';

interface Props extends ClusterPeer {
  mutate?: KeyedMutator<{ clusterpeer: ClusterPeer }>;
}

const Security: React.FC<Props> = ({ clusterSecretName }) => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dl>
        <dt className="block text-sm font-medium text-gray-700">
          Cluster Secret Name:
        </dt>
        <dd className="text-sm text-gray-500">{clusterSecretName}</dd>
      </dl>
    </div>
  );
};

export default Security;
