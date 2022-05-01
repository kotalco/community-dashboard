import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';

interface IconProps {
  className?: string;
}

interface URL {
  type: 'link';
  url: string;
}

interface Button {
  type: 'button';
  subLinks: { name: string; href: string; protocol: string }[];
}

type Props = {
  Icon: React.ComponentType<React.PropsWithChildren<IconProps>>;
} & (URL | Button);

const NavLink: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const { pathname } = useRouter();
  const active =
    props.type === 'button' &&
    props.subLinks.some(({ protocol }) => pathname.includes(protocol));
  const activeClassNames = {
    link: 'bg-gray-100 text-gray-900',
    icon: 'text-gray-500',
  };
  const defaultClassNames = {
    link: 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
    icon: 'text-gray-400 group-hover:text-gray-500',
  };

  if (props.type === 'link') {
    return (
      <div>
        <Link href={props.url}>
          <a
            className={`${
              pathname === props.url
                ? activeClassNames.link
                : defaultClassNames.link
            } group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md`}
          >
            <props.Icon
              className={`${
                pathname === props.url
                  ? activeClassNames.icon
                  : defaultClassNames.icon
              } mr-3 h-6 w-6`}
            />
            {children}
          </a>
        </Link>
      </div>
    );
  }

  return (
    <Disclosure defaultOpen={active} as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`${
              active ? activeClassNames.link : defaultClassNames.link
            } group w-full flex items-center pl-2 pr-1 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <props.Icon
              className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
              aria-hidden="true"
            />
            {children}
            <ChevronRightIcon
              className={`${
                open ? 'text-gray-400 rotate-90' : 'text-gray-300'
              } ml-auto h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="space-y-1">
            {props.subLinks.map(({ href, name, protocol }) => (
              <Link key={name} href={href}>
                <a
                  className={`group w-full flex items-center pl-11 pr-2 py-2 text-sm text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
                    pathname.split('/').includes(protocol)
                      ? 'font-bold'
                      : 'font-medium'
                  }`}
                >
                  {name}
                </a>
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavLink;
