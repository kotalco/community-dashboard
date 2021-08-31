import { EthereumAPI } from '@enums/Ethereum/EthereumAPI';

type APIOption = { label: string; value: EthereumAPI };

export const apiOptions: APIOption[] = [
  { label: 'Admin', value: EthereumAPI.admin },
  { label: 'Clique', value: EthereumAPI.clique },
  { label: 'Debug', value: EthereumAPI.debug },
  { label: 'EEA', value: EthereumAPI.eea },
  { label: 'ETH', value: EthereumAPI.eth },
  { label: 'IBFT', value: EthereumAPI.ibft },
  { label: 'Miner', value: EthereumAPI.miner },
  { label: 'Net', value: EthereumAPI.net },
  { label: 'Perm', value: EthereumAPI.perm },
  { label: 'Plugins', value: EthereumAPI.plugins },
  { label: 'Privacy', value: EthereumAPI.privacy },
  { label: 'Txpool', value: EthereumAPI.txpool },
  { label: 'Web3', value: EthereumAPI.web3 },
];
