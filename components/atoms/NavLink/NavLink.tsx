import Link from 'next/link';
import { useRouter } from 'next/router';

interface IconProps {
  className?: string;
}

interface Props {
  url: string;
  Icon?: React.ComponentType<IconProps>;
}

const NavLink: React.FC<Props> = ({ children, url, Icon }) => {
  const { pathname } = useRouter();
  const activeClassNames = {
    link: 'bg-gray-100 text-gray-900',
    icon: 'text-gray-500',
  };
  const defaultClassNames = {
    link: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
    icon: 'text-gray-400 group-hover:text-gray-500',
  };

  return (
    // Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    <Link href={url}>
      <a
        className={`${
          pathname === url ? activeClassNames.link : defaultClassNames.link
        } group flex items-center px-2 py-2 font-medium rounded-md`}
      >
        {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}
        {Icon && (
          <Icon
            className={`${
              pathname === url ? activeClassNames.icon : defaultClassNames.icon
            }`}
          />
        )}
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
