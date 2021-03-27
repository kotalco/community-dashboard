import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '@components/atoms/Button/Button'
import Typography from '@components/atoms/Typgraphy/Typography'
import { deleteNode } from '@utils/requests'

interface Props {
  nodeName: string
}

const DangerousZoneContent: React.FC<Props> = ({ nodeName }) => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { protocol } = router.query

  const handleClick = async () => {
    setError('')
    try {
      await deleteNode(protocol as string, nodeName)
      router.push('/')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  return (
    <div>
      <div className="px-4 py-5 sm:p-6">
        <Typography variant="p" className="text-gray-700">
          By deleting this node, all connected Apps will lose access to the
          Blockchain network.
        </Typography>
        <Typography variant="p" className="text-gray-700">
          Node attached volume that persists Blockchain data will not be
          removed, you need to delete it yourself.
        </Typography>
        <Typography variant="p" className="text-gray-700">
          Are you sure you want to delete this node ?
        </Typography>
      </div>
      {error && <Typography variant="p">{error}</Typography>}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button alert onClick={handleClick}>
          Delete Node
        </Button>
      </div>
    </div>
  )
}

export default DangerousZoneContent
