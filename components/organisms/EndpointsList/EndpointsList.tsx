import { ENDPOINTS } from '../../../src/data/data'
import EndpointItem from '@components/molecules/EndpointItem/EndpointItem'

const EndpointsList: React.FC = () => {
  return (
    <ul className="divide-y divide-gray-200">
      {ENDPOINTS.map(({ id, name, nodeName }) => (
        <EndpointItem key={id} name={name} nodeName={nodeName} />
      ))}
    </ul>
  )
}

export default EndpointsList
