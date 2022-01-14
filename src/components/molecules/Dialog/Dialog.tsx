import { Fragment, useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { XIcon, ExclamationIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';

interface Props {
  close: () => void;
  error?: string;
  title?: string;
  open: boolean;
}

const Modal: React.FC<Props> = ({ close, title, children, open, error }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        initialFocus={closeButtonRef}
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <IconButton
                  ref={closeButtonRef}
                  className="text-gray-400 bg-white rounded-md hover:text-gray-500"
                  onClick={close}
                >
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </IconButton>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full shrink-0 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon
                    className="w-6 h-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  <div className="mt-2">{children}</div>
                  {error && (
                    <p className="mt-2 text-sm font-medium text-right text-red-600">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
