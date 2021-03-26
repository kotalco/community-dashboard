import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { EthereumNode } from '@interfaces/Node'
import { ethereumNodeClientsOptions } from '@data/data'
import { Protocol } from '@enums/Protocol'

interface Props {
  node: EthereumNode
}

const ProtocolTabContent: React.FC<Props> = ({ node }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const { protocol } = router.query
  const clients =
    protocol === Protocol.ethereum ? ethereumNodeClientsOptions : []

  const onSubmit = (data: { client: string }) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{protocol}</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Chain
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{node.network}</span>
          </dd>
        </dl>
        <div className="mt-4">
          <Select
            ref={register}
            options={clients}
            defaultValue={node.client}
            name="client"
            label="Client Software"
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </div>
    </>
  )
}

export default ProtocolTabContent
