import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@components/atoms/Button/Button'
import DeleteModal from '@components/organisms/DeleteModal/DeleteModal'
import { deleteIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import TextInput from '@components/molecules/TextInput/TextInput'

interface FormData {
  name: string
}

interface Props {
  peerName: string
}

const DangerousZoneContent: React.FC<Props> = ({ peerName }) => {
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
      await deleteIPFSPeer(peerName)
      router.push('/deployments/ipfs/peers')
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
            By deleting this peer, all connected Apps will lose access to the
            Blockchain network.
          </p>
          <p className="text-gray-700">
            Peer attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this peer ?
          </p>
        </div>
        {error && <p>{error}</p>}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button className="btn btn-alert" onClick={openModal}>
            Delete Peer
          </Button>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        close={closeModal}
        title="Delete Ethereum Node"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={name !== peerName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this node
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the node (
          {peerName}) node.
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the peer name (
            <span className="font-bold">{peerName}</span>) to confirm
          </p>
          <TextInput className="rounded-md" {...register('name')} />
        </div>
      </DeleteModal>
    </>
  )
}

export default DangerousZoneContent