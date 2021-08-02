import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { SelectOption } from '@interfaces/SelectOption';

export const secretTypesOptions: SelectOption[] = [
  { label: 'Password', value: KubernetesSecretTypes.password },
  {
    label: 'Ethereum Private Key',
    value: KubernetesSecretTypes.ethereumPrivatekey,
  },
  {
    label: 'Ethereum 2.0 Keystore',
    value: KubernetesSecretTypes.ethereum2Keystore,
  },
  { label: 'IPFS Swarm Key', value: KubernetesSecretTypes.ipfsSwarmKey },
  {
    label: 'IPFS Cluster Secret',
    value: KubernetesSecretTypes.ipfsClusterSecret,
  },
  {
    label: 'IPFS Cluster Key Privatekey',
    value: KubernetesSecretTypes.ipfsClusterPeerPrivatekey,
  },
];
