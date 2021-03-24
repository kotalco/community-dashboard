import NodeItem from '@components/molecules/NodeItem/NodeItem'
import { EthereumNode } from '@interfaces/Node'

interface Props {
  nodes: EthereumNode[]
}

const NodesList: React.FC<Props> = ({ nodes }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {nodes.map((node) => (
        <NodeItem
          key={node.name}
          name={node.name}
          client={node.client}
          network={node.network}
        />
      ))}
    </ul>
  )
}

export default NodesList
