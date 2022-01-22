import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { SelectOption } from '@interfaces/SelectOption';

export const secretTypesOptions: SelectOption[] = [
  { label: 'Password', value: KubernetesSecretTypes.password },
  {
    label: 'Ethereum Private Key',
    value: KubernetesSecretTypes.ethereumPrivatekey,
  },
  {
    label: 'Polkadot Private Key',
    value: KubernetesSecretTypes.polkadotPrivatekey,
  },
  {
    label: 'NEAR Private Key',
    value: KubernetesSecretTypes.nearPrivateKey,
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
    label: 'IPFS Cluster Key',
    value: KubernetesSecretTypes.ipfsClusterPeerPrivatekey,
  },
  { label: 'TLS Certificate', value: KubernetesSecretTypes.tlsCertificate },
];
