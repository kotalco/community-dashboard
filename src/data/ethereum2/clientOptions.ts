import { SelectOption } from '@interfaces/SelectOption';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';

export const clientOptions: SelectOption[] = [
  { label: 'ConsenSys Teku', value: Ethereum2Client.teku },
  { label: 'Prysmatic Labs Prysm', value: Ethereum2Client.prysm },
  { label: 'Sigma prime Lighthouse', value: Ethereum2Client.lighthouse },
  { label: 'Status.im Nimbus', value: Ethereum2Client.nimbus },
];
