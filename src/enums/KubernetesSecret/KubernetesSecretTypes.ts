export enum KubernetesSecretTypes {
  password = 'password',
  ethereumPrivatekey = 'ethereum_privatekey',
  ethereum2Keystore = 'ethereum2_keystore',
  ipfsSwarmKey = 'ipfs_swarm_key',
  ipfsClusterSecret = 'ipfs_cluster_secret',
  ipfsClusterPeerPrivatekey = 'ipfs_cluster_peer_privatekey',
  tlsCertificate = 'tls_certificate',
  polkadotPrivatekey = 'polkadot_node_private_key',
  nearPrivateKey = 'near_private_key',
}
