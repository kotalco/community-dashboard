import { SelectOption } from '@interfaces/SelectOption'
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'

export const clientOptions: SelectOption[] = [
  { label: 'ConsenSys Teku', value: ValidatorsClients.teku },
  { label: 'Prysmatic Labs Prysm', value: ValidatorsClients.prysm },
  { label: 'Sigma prime Lighthouse', value: ValidatorsClients.lighthouse },
  { label: 'Status.im Nimbus', value: ValidatorsClients.nimbus },
]
