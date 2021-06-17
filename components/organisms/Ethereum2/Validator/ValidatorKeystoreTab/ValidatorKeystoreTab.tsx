import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateValidator } from '@utils/requests/ethereum2/validators'
import { UpdateKeystores } from '@interfaces/ethereum2/Ethereum2Validator'
import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'

import { walletPasswordSecretName as walletValues } from '@data/data'

interface Props {
  name: string
  keystores: { secretName: string }[]
  walletPasswordSecretName: string
}

const ValidatorKeystoreTab: React.FC<Props> = ({
  name,
  keystores,
  walletPasswordSecretName,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateKeystores>({
    defaultValues: { keystores, walletPasswordSecretName },
  })

  const onSubmit: SubmitHandler<UpdateKeystores> = async (values) => {
    console.log(values)
    // setSubmitError('')
    // setSubmitSuccess('')

    // try {
    //   const validator = await updateValidator(name, values)
    //   mutate(name, validator)
    //   reset(values)
    //   setSubmitSuccess('Validator has been updated')
    // } catch (e) {
    //   setSubmitError(e.response.data.error)
    // }
  }

  return (
    <>
      <div className="px-4 sm:p-6">
        <Select
          className="rounded-md"
          label="Prysm Client Wallet Password"
          options={walletValues}
          {...register('walletPasswordSecretName')}
        />
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
