export interface StatsResponse {
  activePeersCount: number;
  maxPeersCount: number;
  sentBytesPerSecond: number;
  receivedBytesPerSecond: number;
  latestBlockHeight: number;
  earliestBlockHeight: number;
  syncing: boolean;
}

export interface StatsError {
  error: string;
}
