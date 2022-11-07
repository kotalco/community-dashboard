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
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
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
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <IconButton
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </IconButton>
                </div>
              </Transition.Child>
              <div className="flex items-center px-4 shrink-0">
                <Logo />
              </div>
              <NavLinks className="h-full mt-5 overflow-y-auto divide-y shrink-0 divide-white-800" />
              <div className="shadow-2xl">
                <a
                  href="https://www.kotal.co"
                  className="block px-4 py-3 mx-2 my-3 mb-1 font-semibold text-center text-white bg-red-600 rounded font-nunito hover:bg-red-700"
                >
                  Upgrade to Kotal Pro
                </a>
                <ul className="pb-4 text-sm font-light text-center text-gray-500">
                  <li className="m-2 font-bold text-black font-nunito">
                    Get 1 month for free
                  </li>
                  <li>Secure API endpoints</li>
                  <li>Team management</li>
                  <li>Workspace management</li>
                  <li>Role-based Access Control</li>
                  <li>24/7 support</li>
                </ul>
              </div>
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
