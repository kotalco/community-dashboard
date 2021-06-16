import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@components/atoms/Button/Button'
import DeleteModal from '@components/organisms/DeleteModal/DeleteModal'
import { deleteBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import TextInput from '@components/molecules/TextInput/TextInput'
import { useNotification } from '@components/contexts/NotificationContext'

interface FormData {
  name: string
}

interface Props {
  nodeName: string
}

const DeleteBeaconNode: React.FC<Props> = ({ nodeName }) => {
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { createNotification } = useNotification()

  const router = useRouter()
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>()

  const [name] = watch(['name'])

  const onSubmit = async () => {
    setError('')
    try {
      await deleteBeaconNode(nodeName)
      createNotification({
        title: 'Beacon node has been deleted',
        protocol: 'Beacon node',
        name: nodeName,
        action: 'deleted successfully',
      })
      router.push('/deployments/ethereum2/beaconnodes')
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
          <p className="text-gray-700">
            By deleting this node, all connected Apps will lose access to the
            Blockchain network.
          </p>
          <p className="text-gray-700">
            Node attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this node ?
          </p>
        </div>
        {error && <p>{error}</p>}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button className="btn btn-alert" onClick={openModal}>
            Delete Beacon Node
          </Button>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        close={closeModal}
        title="Delete Ethereum 2.0 Beacon Node"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={name !== nodeName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this beacon node
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the node (
          {nodeName}) beacon node.
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the node name (
            <span className="font-bold">{nodeName}</span>) to confirm
          </p>
          <TextInput className="rounded-md" {...register('name')} />
        </div>
      </DeleteModal>
    </>
  )
}

export default DeleteBeaconNode
