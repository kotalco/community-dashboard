import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'

export interface Ethereum2BeaconNode {
  name: string
  network: string
  client: BeaconNodeClient
  eth1Endpoints: string[]
  rest: boolean
  restPort: number
  restHost: string
  rpc: boolean
  rpcPort: number
  rpcHost: string
  grpc: boolean
  grpcPort: number
  grpcHost: string
  cpu: string
  cpuLimit: string
  memory: string
  memoryLimit: string
  storage: string
}

export interface CreateEthereum2BeaconNode {
  name: string
  client: BeaconNodeClient
  network: string
}

export interface MutableEthereum2BeaconNode {
  client?: BeaconNodeClient
  eth1Endpoints?: string[]
  rest?: boolean
  restPort?: number
  restHost?: string
  rpc?: boolean
  rpcPort?: number
  rpcHost?: string
  grpc?: boolean
  grpcPort?: number
  grpcHost?: string
  cpu?: string
  cpuLimit?: string
  memory?: string
  memoryLimit?: string
  storage?: string
}
