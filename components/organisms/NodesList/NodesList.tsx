import { NODES } from '../../../src/data/nodes';
import NodeItem from '@components/molecules/NodeItem/NodeItem';

const NodesList: React.FC = () => {
  return (
    <ul className="divide-y divide-gray-200">
      {NODES.map((node) => (
        <NodeItem
          key={node.id}
          id={node.id}
          name={node.name}
          client={node.client}
          server={node.server}
        />
      ))}
    </ul>
  );
};

export default NodesList;
