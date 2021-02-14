import { Transition } from '@headlessui/react';

const MenuOverlay: React.FC = () => {
  return (
    <Transition.Child
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>
    </Transition.Child>
  );
};

export default MenuOverlay;
