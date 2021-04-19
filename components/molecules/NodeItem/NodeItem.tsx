import Link from 'next/link'
import { GlobeAltIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { ChipIcon } from '@heroicons/react/outline'

interface Props {
  name: string
  client: string
  network: string
}

const NodeItem: React.FC<Props> = (props) => {
  const { name, client, network } = props

  return (
    <li>
      <Link href={`/ethereum/nodes/${name}`}>
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex text-sm font-medium text-indigo-600 truncate">
                  <p>{name}</p>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{client}</p>
                    <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{network}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 flex-shrink-0">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default NodeItem
