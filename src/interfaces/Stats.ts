export interface NearStatsResponse {
  activePeersCount: number;
  maxPeersCount: number;
  sentBytesPerSecond: number;
  receivedBytesPerSecond: number;
  latestBlockHeight: number;
  earliestBlockHeight: number;
  syncing: boolean;
}

export interface EthereumStatsResponse {
  currentBlock: number;
  highestBlock: number;
  peersCount: number;
}

export interface PolkadotStatsResponse {
  currentBlock: number;
  highestBlock: number;
  peersCount: number;
  syncing: boolean;
}

export interface StatsError {
  error: string;
}
