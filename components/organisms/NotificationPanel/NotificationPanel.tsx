import { Transition } from '@headlessui/react'

import CheckCircleIcon from '@components/Icons/CheckCircleIcon/CheckCircleIcon'
import IconButton from '@components/atoms/IconButton/IconButton'
import Typography from '@components/atoms/Typgraphy/Typography'
import CloseIcon from '@components/Icons/CloseIcon/CloseIcon'

interface Props {
  show: boolean
  close: () => void
  title?: string
  name: string
  type: string
}

const NotificationPanel: React.FC<Props> = ({
  show,
  title,
  name,
  type,
  close,
}) => {
  return (
    <div className="z-30 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:-6 sm:items-start sm:justify-end">
      <Transition
        show={show}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:tarnslate-x-2"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-0 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <Typography
                variant="p"
                className="text-sm font-medium text-gray-900"
              >
                {title}
              </Typography>
              <Typography variant="p" className="mt-1 text-sm text-gray-500">
                <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
                  {name}
                </span>{' '}
                {type} has been created successfully, and will be up and running
                in few seconds.
              </Typography>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <IconButton
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                srOnly="Close"
                onClick={close}
              >
                <CloseIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default NotificationPanel
