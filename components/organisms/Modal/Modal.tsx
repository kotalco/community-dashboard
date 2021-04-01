import { Transition } from '@headlessui/react'

import MenuOverlay from '@components/atoms/MenuOverlay/MenuOverlay'
import IconButton from '@components/atoms/IconButton/IconButton'
import CloseIcon from '@components/Icons/CloseIcon/CloseIcon'
import OutlineExclamationIcon from '@components/Icons/OutlineExclamationIcon/OutlineExclamationIcon'

interface Props {
  close: () => void
  title?: string
  show: boolean
  action?: React.ReactElement
}

const Modal: React.FC<Props> = ({ close, title, children, show, action }) => {
  return (
    <Transition show={show} className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0"
          aria-hidden={true}
        >
          <MenuOverlay />
        </Transition.Child>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-out duration-300"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          aria-hidden={true}
        >
          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <IconButton
              onClick={close}
              srOnly="Close"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CloseIcon className="h-6 w-6" />
            </IconButton>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <OutlineExclamationIcon />
            </div>
            {title && (
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">{children}</div>
              </div>
            )}
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            {action}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

export default Modal
