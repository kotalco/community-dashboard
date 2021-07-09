import { useState, Dispatch, SetStateAction } from 'react'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import Dialog from '@components/molecules/Dialog/Dialog'
import { deleteSecret as sendDeleteRequest } from '@utils/requests/secrets'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
  secretName: string
}

const DeleteSecretDialoge: React.FC<Props> = ({
  setOpen,
  open,
  secretName,
}) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeDialog = () => {
    setOpen(false)
    setError('')
  }

  const deleteSecret = async (secretName: string) => {
    try {
      setError('')
      setIsSubmitting(true)
      await sendDeleteRequest(secretName)
      mutate('/core/secrets')
      setOpen(false)
    } catch (e) {
      setError(e.response.data.error)
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog
      open={open}
      close={closeDialog}
      error={error}
      action={
        <Button
          className="btn btn-alert"
          onClick={() => deleteSecret(secretName)}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Confirm
        </Button>
      }
    >
      <p className="text-sm text-gray-500">
        Are you sure you want to delete secret:{' '}
        <span className="font-semibold">{secretName}</span>?
      </p>
    </Dialog>
  )
}

export default DeleteSecretDialoge
