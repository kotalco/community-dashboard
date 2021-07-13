import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { joiResolver } from '@hookform/resolvers/joi'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import { useNotification } from '@components/contexts/NotificationContext'
import { clientOptions } from '@data/ethereum/node/clientOptions'
import { networkOptions } from '@data/ethereum/node/networkOptions'
import { createEthereumNode } from '@utils/requests/ethereumNodeRequests'
import { schema } from '@schemas/ethereumNode/createNode'
import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode'

const CreateNode: React.FC = () => {
  const router = useRouter()
  const { createNotification } = useNotification()
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereumNode>({ resolver: joiResolver(schema) })
  const selectNetwork = watch('selectNetwork')

  /**
   * Submit create ethereum node form
   * @param nodeData the data required to create new node
   */
  const onSubmit: SubmitHandler<CreateEthereumNode> = async ({
    name,
    client,
    selectNetwork,
    textNetwork,
  }) => {
    const network = selectNetwork === 'other' ? textNetwork : selectNetwork
    const body = { name, client, network }

    try {
      const node = await createEthereumNode(body)
      createNotification({
        title: 'Node has been created',
        protocol: `node`,
        name: node.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      })

      router.push('/deployments/ethereum/nodes')
    } catch (e) {
      setError('name', { type: 'server', message: e.response.data.error })
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Node</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <div className="px-4 py-5 sm:p-6">
            {/* Node Name */}
            <TextInput
              {...register('name')}
              label="Node Name"
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
              className={
                selectNetwork === 'other' ? 'rounded-t-md' : 'rounded-md'
              }
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
          </div>
        </FormLayout>
      </form>
    </Layout>
  )
}

export default CreateNode
