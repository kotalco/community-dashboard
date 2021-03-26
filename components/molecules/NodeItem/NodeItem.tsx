import Link from 'next/link'

import Typography from '@components/atoms/Typgraphy/Typography'
import GlobeIcon from '@components/Icons/GlobeIcon/GlobeIcon'
import ChipIcon from '@components/Icons/ChipIcon/ChipIcon'
import ChevronRightIcon from '@components/Icons/ChevronRightIcon/ChevronRightIcon'

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
                  <Typography variant="p">{name}</Typography>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    <GlobeIcon />
                    <Typography variant="p">{client}</Typography>
                    <ChipIcon />
                    <Typography variant="p">{network}</Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 flex-shrink-0">
              <ChevronRightIcon />
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default NodeItem
