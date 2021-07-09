import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@components/atoms/Button/Button'
import DeleteModal from '@components/molecules/Dialog/Dialog'
import { deleteValidator } from '@utils/requests/ethereum2/validators'
import TextInput from '@components/molecules/TextInput/TextInput'
import { useNotification } from '@components/contexts/NotificationContext'

interface FormData {
  name: string
}

interface Props {
  validatorName: string
}

const DeleteValidator: React.FC<Props> = ({ validatorName }) => {
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
      await deleteValidator(validatorName)
      createNotification({
        title: 'Validator has been deleted',
        protocol: 'Validator',
        name: validatorName,
        action: 'deleted successfully',
      })
      router.push('/deployments/ethereum2/validators')
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
            By deleting this validator, all connected Apps will lose access to
            the Blockchain network.
          </p>
          <p className="text-gray-700">
            Validator attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this validator ?
          </p>
        </div>
        {error && <p>{error}</p>}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button className="btn btn-alert" onClick={openModal}>
            Delete Validator
          </Button>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        close={closeModal}
        title="Delete Ethereum 2.0 Validator"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={name !== validatorName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this validator
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the
          validator ({validatorName}).
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the validator name (
            <span className="font-bold">{validatorName}</span>) to confirm
          </p>
          <TextInput className="rounded-md" {...register('name')} />
        </div>
      </DeleteModal>
    </>
  )
}

export default DeleteValidator
