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

export interface StatsError {
  error: string;
}
