import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'

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
