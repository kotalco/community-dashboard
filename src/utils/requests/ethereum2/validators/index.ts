import axios from '../../../axios';

import {
  CreateValidator,
  Validator,
  UpdateValidator,
} from '@interfaces/ethereum2/Validator';

export const createValidator = async (values: CreateValidator) => {
  const { data } = await axios.post<{ validator: Validator }>(
    '/ethereum2/validators',
    values
  );

  return data.validator;
};

/**
 * Send a get request to find a validator by its name
 * @param validatorName Name of the validator we are looking for
 * @returns All validator data if found or 404 if not
 */
export const getValidator = async (
  validatorName: string
): Promise<Validator> => {
  const { data } = await axios.get<{ validator: Validator }>(
    `/ethereum2/validators/${validatorName}`
  );

  return data.validator;
};

/**
 * Send a delete request to delete the validator
 * @param validatorName Vaidator name to be deleted
 */
export const deleteValidator = async (validatorName: string): Promise<void> => {
  await axios.delete(`/ethereum2/validators/${validatorName}`);
};

/**
 * Send a put request to update some data of the validator
 * @param validatorName the name of the validator needs to be updated
 * @param validatorData the updated data
 * @returns the validator after updating
 */
export const updateValidator = async (
  validatorName: string,
  validatorData: UpdateValidator
): Promise<Validator> => {
  const { data } = await axios.put<{ validator: Validator }>(
    `/ethereum2/validators/${validatorName}`,
    validatorData
  );

  return data.validator;
};
