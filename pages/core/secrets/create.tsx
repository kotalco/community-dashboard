import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useRouter } from 'next/router'

import Layout from '@components/templates/Layout/Layout'
import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import { CreateKubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret'
import { secretTypesOptions } from '@data/kubernetesSecrets/secretTypesOptions'
import { schema } from '@schemas/kubernetesSecrets/createKubernetesSecret'
import { createSecret } from '@utils/requests/secrets'

const CreateSecret: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateKubernetesSecret>({
    resolver: joiResolver(schema),
  })
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
        <div className="bg-white shadow rounded-lg mt-4 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
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
                  error={errors.data?.password?.message}
                  {...register('data.password')}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={(isSubmitted && !isValid) || isSubmitting}
              loading={isSubmitting}
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default CreateSecret
