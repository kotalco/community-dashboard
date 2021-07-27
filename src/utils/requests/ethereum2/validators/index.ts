import axios from '../../../axios';

import {
  CreateEthereum2Validator,
  Ethereum2Validator,
  UpdateEthereum2Validator,
} from '@interfaces/ethereum2/Ethereum2Validator';

/**
 * Send a get request to find all ethereum 2.0 validators
 * @returns All Ethereum 2.0 validators
 */
export const getAllValidators = async (): Promise<Ethereum2Validator[]> => {
  const { data } = await axios.get<{ validators: Ethereum2Validator[] }>(
    `/ethereum2/validators`
  );

  return data.validators;
};

/**
 * Send a post request to create a new validator using ethereum 2.0 protocol
 * @param body The required data to create a new validator
 * @returns The newly created validator
 */
export const createValidator = async (
  values: CreateEthereum2Validator
): Promise<Ethereum2Validator> => {
  const { keystores, ...rest } = values;
  const keystoresObject = keystores.map((key) => ({ secretName: key }));

  const body = {
    keystores: keystoresObject,
    ...rest,
  };

  const { data } = await axios.post<{ validator: Ethereum2Validator }>(
    '/ethereum2/validators',
    body
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
): Promise<Ethereum2Validator> => {
  const { data } = await axios.get<{ validator: Ethereum2Validator }>(
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
  validatorData: UpdateEthereum2Validator
): Promise<Ethereum2Validator> => {
  const { data } = await axios.put<{ validator: Ethereum2Validator }>(
    `/ethereum2/validators/${validatorName}`,
    validatorData
  );

  return data.validator;
};
