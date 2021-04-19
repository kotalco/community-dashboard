import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

import IconButton from '@components/atoms/IconButton/IconButton'

interface Props {
  title?: string
  name: string
  type: string
}

const NotificationPanel: React.FC<Props> = ({ title, name, type }) => {
  const [show, setShow] = useState(true)

  return (
    <>
      <div
        aria-live="assertive"
        className="z-30 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
      >
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
                      {name}
                    </span>{' '}
                    {type} has been created successfully, and will be up and
                    running in few seconds.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <IconButton
                    className="btn-icn"
                    srText="Close"
                    onClick={() => {
                      setShow(false)
                    }}
                  >
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default NotificationPanel
