import { api } from '../../../axios';

import {
  CreateValidator,
  Validator,
  UpdateValidator,
} from '@interfaces/ethereum2/Validator';

export const createValidator = async (values: CreateValidator) => {
  const validator = await api.post<never, Validator>(
    '/ethereum2/validators',
    values
  );

  return validator;
};

export const updateValidator = async (
  validatorName: string,
  validatorData: UpdateValidator
): Promise<Validator> => {
  const validator = await api.put<never, Validator>(
    `/ethereum2/validators/${validatorName}`,
    validatorData
  );

  return validator;
};

export const deleteValidator = async (validatorName: string) => {
  await api.delete(`/ethereum2/validators/${validatorName}`);
};
