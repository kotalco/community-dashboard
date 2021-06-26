import { useState } from 'react'
import { useForm, SubmitHandler, Controller, FieldError } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateValidator } from '@utils/requests/ethereum2/validators'
import { UpdateKeystores } from '@interfaces/ethereum2/Ethereum2Validator'
import Multiselect from '@components/molecules/Multiselect/Multiselect'
import Select from '@components/molecules/Select/Select'

import {
  walletPasswordSecretName as walletValues,
  keystores as allKeystores,
} from '@data/data'
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'
import { updateKeystoresSchema } from '@schemas/ethereum2/validator/updateValidatorSchema'

interface Props {
  name: string
  keystores: { secretName: string }[]
  walletPasswordSecretName: string
  client: ValidatorsClients
}

const ValidatorKeystoreTab: React.FC<Props> = ({
  name,
  keystores,
  walletPasswordSecretName,
  client,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const keystoresOptions = allKeystores.map(({ secretName }) => secretName)
  const selectedKeystores = keystores.map(({ secretName }) => secretName)

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateKeystores>({
    resolver: joiResolver(updateKeystoresSchema),
    defaultValues: {
      keystores: selectedKeystores,
      walletPasswordSecretName,
      client,
    },
  })
  const keystoresError = errors.keystores as FieldError | undefined

  const onSubmit: SubmitHandler<UpdateKeystores> = async (values) => {
    const { keystores, ...rest } = values
    const keystoresObject = keystores.map((key) => ({ secretName: key }))
    const valuesToUpdate = { ...rest, keystores: keystoresObject }

    setSubmitError('')
    setSubmitSuccess('')
    try {
      const validator = await updateValidator(name, valuesToUpdate)
      mutate(name, validator)
      reset(values)
      setSubmitSuccess('Validator has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        {/* Key Stores */}
        <Controller
          name="keystores"
          control={control}
          render={({ field }) => (
            <Multiselect
              label="Ethereum 2.0 Keystores"
              placeholder="Choose your keystores..."
              options={keystoresOptions}
              error={keystoresError?.message}
              {...field}
            />
          )}
        />

        {walletPasswordSecretName && (
          <Select
            className="rounded-md"
            label="Prysm Client Wallet Password"
            options={walletValues}
            {...register('walletPasswordSecretName')}
          />
        )}
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  )
}

export default ValidatorKeystoreTab
