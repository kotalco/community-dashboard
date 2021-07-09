import React, { useState } from 'react'
import { SubmitHandler, useForm, Controller, FieldError } from 'react-hook-form'
import { useRouter } from 'next/router'
import { joiResolver } from '@hookform/resolvers/joi'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput'
import Multiselect from '@components/molecules/Multiselect/Multiselect'
import { useNotification } from '@components/contexts/NotificationContext'
import { clientOptions } from '@data/ethereum2/validator/clientOptions'
import { networkOptions } from '@data/ethereum2/validator/networkOption'
import { schema } from '@schemas/ethereum2/validator/createValidatorSchema'
import { CreateEthereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator'

import { walletPasswordSecretName, keystores } from '@data/data'
import { createValidator } from '@utils/requests/ethereum2/validators'
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'

const CreateBeaconNodeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const { createNotification } = useNotification()
  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
    handleSubmit,
  } = useForm<CreateEthereum2Validator>({
    defaultValues: { beaconEndpoints: [], keystores: [] },
    resolver: joiResolver(schema),
  })
  const [selectNetwork, client] = watch(['selectNetwork', 'client'])
  const beaconEndpointsError = errors.beaconEndpoints as FieldError | undefined
  const keystoresError = errors.keystores as FieldError | undefined
  const keystoresOptions = keystores.map(({ secretName }) => secretName)

  /**
   * Submit create validator form
   * @param ValidatorData the data required to create new node
   */
  const onSubmit: SubmitHandler<CreateEthereum2Validator> = async (values) => {
    try {
      setSubmitError('')
      const validator = await createValidator(values)

      createNotification({
        title: 'Validator has been created',
        protocol: `validator`,
        name: validator.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      })
      router.push('/deployments/ethereum2/validators')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Beacon Node Name */}
        <TextInput
          {...register('name')}
          label="Validator Name"
          className="rounded-md"
          error={errors.name?.message}
        />

        {/* Client */}
        <Select
          label="Client"
          error={errors.client?.message}
          className="rounded-md"
          options={[
            { label: 'Choose a client...', value: '' },
            ...clientOptions,
          ]}
          {...register('client')}
        />
        {/* Network */}
        <Select
          label="Network"
          error={errors.selectNetwork?.message}
          className={selectNetwork === 'other' ? 'rounded-t-md' : 'rounded-md'}
          options={[
            { label: 'Choose a network...', value: '' },
            ...networkOptions,
          ]}
          {...register('selectNetwork')}
        />
        {selectNetwork === 'other' && (
          <TextInput
            error={errors.textNetwork?.message}
            placeholder="Network Name"
            className="rounded-none rounded-b-md"
            {...register('textNetwork')}
          />
        )}

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

        {/* Prysm Client Wallet Password */}
        {client === ValidatorsClients.prysm && (
          <Select
            label="Prysm Client Wallet Password"
            error={errors.walletPasswordSecretName?.message}
            className="rounded-md"
            options={[
              'Choose a wallet password...',
              ...walletPasswordSecretName,
            ]}
            {...register('walletPasswordSecretName')}
          />
        )}

        {/* Beacon Node Endpoints */}
        <div className="mt-5">
          <Controller
            name="beaconEndpoints"
            control={control}
            render={({ field }) => (
              <TextareaWithInput
                multiple={client === ValidatorsClients.lighthouse}
                label="Ethereum Node JSON-RPC Endpoints"
                helperText="One endpoint per each line"
                error={beaconEndpointsError?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* <!-- end: content here --> */}
      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Create
        </Button>

        {/* Show if there is an error from server */}
        {submitError && (
          <p className="text-center text-red-500">{submitError}</p>
        )}
      </div>
    </form>
  )
}

export default CreateBeaconNodeForm
