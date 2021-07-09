import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Layout from '@components/templates/Layout/Layout'
import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import Textarea from '@components/molecules/Textarea/Textarea'
import { CreateKubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret'
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions'
import {
  nameValidations,
  typeValidations,
  passwordValidations,
  keyValidations,
} from '@schemas/kubernetesSecrets/createKubernetesSecret'
import { createSecret } from '@utils/requests/secrets'
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes'

const CreateSecret: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateKubernetesSecret>()
  const type = watch('type')

  const onSubmit: SubmitHandler<CreateKubernetesSecret> = async (values) => {
    try {
      await createSecret(values)
      router.push('/core/secrets')
    } catch (e) {
      setError('name', { type: 'server', message: e.response.data.error })
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Secret</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <TextInput
            label="Secret Name"
            className="rounded-md"
            error={errors.name?.message}
            {...register('name', nameValidations)}
          />

          <Select
            label="Secret Type"
            error={errors.type?.message}
            className="rounded-md"
            {...register('type', typeValidations)}
            options={[
              { label: 'Choose a type...', value: '' },
              ...secretTypesOptions,
            ]}
          />

          {type === KubernetesSecretTypes.password && (
            <div className="mt-4">
              <TextInput
                label="Password"
                className="rounded-md"
                type="password"
                error={errors.data?.password?.message}
                {...register('data.password', passwordValidations)}
              />
            </div>
          )}

          {type === KubernetesSecretTypes.privatekey && (
            <div className="mt-4">
              <Textarea
                label="Key"
                {...register('data.key', keyValidations)}
                error={errors.data?.key?.message}
              ></Textarea>
            </div>
          )}
        </FormLayout>
      </form>
    </Layout>
  )
}

export default CreateSecret
