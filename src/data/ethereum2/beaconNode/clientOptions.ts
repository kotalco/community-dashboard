import { SelectOption } from '@interfaces/SelectOption'
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'

export const ethereumNodeClientsOptions: SelectOption[] = [
  { label: 'ConsenSys Teku', value: BeaconNodeClient.teku },
  { label: 'Prysmatic Labs Prysm', value: BeaconNodeClient.prysm },
  { label: 'Sigma prime Lighthouse', value: BeaconNodeClient.lighthouse },
  { label: 'Status.im Nimbus', value: BeaconNodeClient.nimbus },
]
