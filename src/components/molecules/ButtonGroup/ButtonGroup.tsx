import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface Props {
  label: string;
  buttons: { name: string; href: string }[];
}

const ButtonGroup: React.FC<Props> = ({ buttons, label }) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <Menu as="span" className="-ml-px relative block">
        {({ open }) => (
          <>
            <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="px-2">{label}</span>
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
            </Menu.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {buttons.map(({ name, href }) => (
                    <Menu.Item key={name}>
                      {({ active }) => (
                        <div>
                          <Link href={href}>
                            <a
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                            >
                              {name}
                            </a>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </span>
  );
};

export default ButtonGroup;
