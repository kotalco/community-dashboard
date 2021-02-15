import { Transition } from '@headlessui/react';

import MenuOverlay from '@components/atoms/MenuOverlay/MenuOverlay';
import IconButton from '@components/atoms/IconButton/IconButton';
import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';
import CloseIcon from '@components/Icons/CloseIcon/CloseIcon';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarMobile: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="md:hidden">
      <Transition show={isOpen} className="fixed inset-0 flex z-40">
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
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <IconButton
              srOnly="Close sidebar"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Logo />
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <NavLinks textSize="text-base" />
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
        </div>
      </Transition>
    </div>
  );
};

export default SidebarMobile;
