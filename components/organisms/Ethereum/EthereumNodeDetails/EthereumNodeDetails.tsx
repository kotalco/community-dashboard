import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode'

interface Props {
  node: EthereumNode
}

const EthereumNodeDetails: React.FC<Props> = ({ node }) => {
  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Ethereum</span>
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
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Client
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{node.client}</span>
          </dd>
        </dl>
      </div>
    </>
  )
}

export default EthereumNodeDetails
