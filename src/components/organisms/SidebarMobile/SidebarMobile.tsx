import { Fragment, SetStateAction, Dispatch } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';
import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarMobile: React.FC<React.PropsWithChildren<Props>> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={isOpen}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <IconButton
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </IconButton>
                </div>
              </Transition.Child>
              <div className="shrink-0 flex items-center px-4">
                <Logo />
              </div>
              <NavLinks className="mt-5 shrink-0 h-full divide-y divide-white-800 overflow-y-auto" />
            </div>
          </Transition.Child>
          <div className="shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SidebarMobile;
