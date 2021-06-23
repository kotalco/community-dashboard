import { useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldError } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { UpdateBeaconEndpoints } from '@interfaces/ethereum2/Ethereum2Validator'
import Textarea from '@components/molecules/Textarea/Textarea'
import { updateValidator } from '@utils/requests/ethereum2/validators'
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients'
import { updateBeaconEndpointsSchema } from '@schemas/ethereum2/validator/updateValidatorSchema'

interface Props {
  name: string
  beaconEndpoints: string[]
  client: ValidatorsClients
}

const ValidatorBeaconNodeTab: React.FC<Props> = ({
  name,
  beaconEndpoints,
  client,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateBeaconEndpoints>({
    defaultValues: { beaconEndpoints },
    resolver: joiResolver(updateBeaconEndpointsSchema),
  })

  const beaconEndpointsError = errors.beaconEndpoints as FieldError | undefined

  const onSubmit: SubmitHandler<UpdateBeaconEndpoints> = async (values) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const validators = await updateValidator(name, values)
      mutate(name, validators)
      reset(values)
      setSubmitSuccess('Validator has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="beaconEndpoints"
          control={control}
          render={({ field }) => (
            <Textarea
              multiple={client === ValidatorsClients.lighthouse}
              error={beaconEndpointsError?.message}
              label="Ethereum 2.0 Beacon Node Endpoints"
              helperText="One endpoint per each line"
              {...field}
            />
          )}
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

export default ValidatorBeaconNodeTab
