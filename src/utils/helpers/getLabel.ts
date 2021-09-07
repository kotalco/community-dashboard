import { SelectOption } from '@interfaces/SelectOption';

export const getLabel = (value: string, options: SelectOption[]) => {
  const option = options.find((option) => value === option.value);
  return option?.label || value;
};
