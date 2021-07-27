import { Fragment, useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { XIcon, ExclamationIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';

interface Props {
  close: () => void;
  error?: string;
  title?: string;
  open: boolean;
  action?: React.ReactElement;
}

const Modal: React.FC<Props> = ({
  close,
  title,
  children,
  open,
  action,
  error,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        initialFocus={closeButtonRef}
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <IconButton
                  ref={closeButtonRef}
                  srText="Close"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={close}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </IconButton>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 flex sm:flex-row-reverse justify-between items-center flex-col">
                {action}
                {error && (
                  <p className="text-sm text-red-500 mt-2 sm:mt-0">{error}</p>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
