import { SelectOption } from '@interfaces/SelectOption';
import { ValidatorsClient } from '@enums/Ethereum2/Validators/ValidatorsClient';

export const clientOptions: SelectOption[] = [
  { label: 'ConsenSys Teku', value: ValidatorsClient.teku },
  { label: 'Prysmatic Labs Prysm', value: ValidatorsClient.prysm },
  { label: 'Sigma prime Lighthouse', value: ValidatorsClient.lighthouse },
  { label: 'Status.im Nimbus', value: ValidatorsClient.nimbus },
];
