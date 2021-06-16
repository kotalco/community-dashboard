import { SelectOption } from '@interfaces/SelectOption'
import { ValidatorsNetworks } from '@enums/Ethereum2/Validators/ValidatorsNetworks'

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: ValidatorsNetworks.mainnet },
  { label: 'Pyrmont', value: ValidatorsNetworks.pyrmont },
  { label: 'Prater', value: ValidatorsNetworks.prater },
  { label: 'Other', value: 'other' },
]
