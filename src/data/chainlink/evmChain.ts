import { SelectOption } from '@interfaces/SelectOption';

// EVM Chains (value) format must follow this: "{id}:{address}"
export const EVM_CHAINS: SelectOption[] = [
  {
    label: 'Ethereum Mainnet',
    value: '1:0x514910771af9ca656af840dff83e8264ecf986ca',
  },
  {
    label: 'Ethereum Kovan',
    value: '42:0xa36085F69e2889c224210F603D836748e7dC0088',
  },
  {
    label: 'Ethereum Rinkeby',
    value: '4:0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
  },
  {
    label: 'Ethereum Goerli',
    value: '5:0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
  },
  {
    label: 'Binance Smart Chain Mainnet',
    value: '56:0x404460c6a5ede2d891e8297795264fde62adbb75',
  },
  {
    label: 'Binance Smart Chain Testnet',
    value: '97:0x84b9b910527ad5c03a9ca831909e21e236ea7b06',
  },
  {
    label: 'Polygon (Matic) Mainnet',
    value: '137:0xb0897686c545045afc77cf20ec7a532e3120e0f1',
  },
  {
    label: 'Polygon (Matic) Mumbai Testnet',
    value: '80001:0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
  },
  {
    label: 'RSK Mainnet',
    value: '30:0x14adae34bef7ca957ce2dde5add97ea050123827',
  },
  {
    label: 'xDai Mainnet',
    value: '100:0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
  },
  {
    label: 'Avalanche Mainnet',
    value: '43114:0x5947BB275c521040051D82396192181b413227A3',
  },
  {
    label: 'Avalanche Fuji Testnet',
    value: '43113:0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
  },
  {
    label: 'Fantom Mainnet',
    value: '250:0x6F43FF82CCA38001B6699a8AC47A2d0E66939407',
  },
  {
    label: 'Fantom Testnet',
    value: '4002:0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F',
  },
  {
    label: 'Arbitrum Rinkeby Testnet',
    value: '421611:0x615fBe6372676474d9e6933d310469c9b68e9726',
  },
  {
    label: 'Huobi Eco Chain Mainnet',
    value: '128:0x9e004545c59D359F6B7BFB06a26390b087717b42',
  },
  {
    label: 'Optimism Mainnet',
    value: '10:0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
  },
  {
    label: 'Optimism Kovan Testnet',
    value: '69:0x4911b761993b9c8c0d14Ba2d86902AF6B0074F5B',
  },
];
