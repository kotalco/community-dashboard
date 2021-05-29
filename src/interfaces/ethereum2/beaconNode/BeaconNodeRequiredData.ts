import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'

export interface BeaconNodeRequiredData {
  name: string
  client: BeaconNodeClient
  network: string
}
