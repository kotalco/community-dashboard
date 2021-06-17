import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'
import { ValidatorsNetworks } from '@enums/Ethereum2/Validators/ValidatorsNetworks'

export interface Ethereum2Validator {
  name: string
  network: string
  client: ValidatorsClients
  graffiti: string
  keystores: { secretName: string }[]
  walletPasswordSecretName: string
  beaconEndpoints: string[]
  cpu: string
  cpuLimit: string
  memory: string
  memoryLimit: string
  storage: string
}

export interface CreateEthereum2Validator {
  name: string
  selectNetwork: ValidatorsNetworks
  textNetwork: string
  client: ValidatorsClients
  keystores: string[]
  walletPasswordSecretName: string
  beaconEndpoints: string[]
}

export interface UpdateEthereum2Validator {
  graffiti?: string
  keystores?: { secretName: string }[]
  walletPasswordSecretName?: string
  beaconEndpoints?: string[]
  cpu?: string
  cpuLimit?: string
  memory?: string
  memoryLimit?: string
  storage?: string
}

export interface UpdateGrafitti {
  graffiti: string
}

export interface UpdateKeystores {
  keystores: { secretName: string }[]
  walletPasswordSecretName: string
}
