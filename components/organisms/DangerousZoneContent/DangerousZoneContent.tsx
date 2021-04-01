import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@components/atoms/Button/Button'
import Typography from '@components/atoms/Typgraphy/Typography'
import Modal from '@components/organisms/Modal/Modal'
import { deleteNode } from '@utils/requests'
import TextInput from '@components/molecules/TextInput/TextInput'

interface FormData {
  name: string
}

interface Props {
  nodeName: string
}

const DangerousZoneContent: React.FC<Props> = ({ nodeName }) => {
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter()
  const { register, watch, handleSubmit } = useForm<FormData>()
  const { protocol } = router.query
  const name = watch('name')

  const onSubmit = async () => {
    setError('')
    try {
      await deleteNode(protocol as string, nodeName)
      router.push('/')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  const closeModal = () => {
    setShowDeleteModal(false)
  }

  const openModal = () => {
    setShowDeleteModal(true)
  }

  return (
    <>
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
          <Button alert onClick={openModal}>
            Delete Node
          </Button>
        </div>
      </div>
      <Modal
        show={showDeleteModal}
        close={closeModal}
        title="Delete node"
        action={
          <Button
            alert
            onClick={handleSubmit(onSubmit)}
            disabled={name !== nodeName}
          >
            I understand the consequnces, delete this node
          </Button>
        }
      >
        <Typography variant="p" className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the node{' '}
          {nodeName} node.
        </Typography>
        <Typography variant="p">
          Please type the node name (
          <span className="font-bold">{nodeName}</span>) to confirm
        </Typography>
        <TextInput name="name" ref={register} />
      </Modal>
    </>
  )
}

export default DangerousZoneContent
