import { SubmitHandler, useForm } from 'react-hook-form'

import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import { CreateKubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret'
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions'

const CreateBeaconNode: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateKubernetesSecret>()
  const type = watch('type')

  const onSubmit: SubmitHandler<CreateKubernetesSecret> = async (values) => {
    console.log(values)
  }

  return (
    <Layout>
      <FormLayout title="Create New Secret">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Secret Name"
            className="rounded-md"
            error={errors.name?.message}
            {...register('name')}
          />

          <Select
            label="Secret Type"
            error={errors.type?.message}
            className="rounded-md"
            {...register('type')}
            options={[
              { label: 'Choose a type...', value: '' },
              ...secretTypesOptions,
            ]}
          />

          {type === 'password' && (
            <div className="mt-4">
              <TextInput
                label="Password"
                className="rounded-md"
                type="password"
                {...register('data.password')}
              />
            </div>
          )}
          <input type="submit" />
        </form>
      </FormLayout>
    </Layout>
  )
}

export default CreateBeaconNode
