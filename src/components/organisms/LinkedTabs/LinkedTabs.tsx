import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  tabs: { name: string; href: string; count?: string }[];
}

const Tabs: React.FC<Props> = ({ tabs }) => {
  const { pathname } = useRouter();

  return (
    <nav className="flex" aria-label="Tabs">
      {tabs.map(({ name, href, count }) => (
        <Link key={name} href={href}>
          <a
            className={`${
              pathname === href
                ? 'border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex justify-center items-center first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap py-4 px-8 border-b-2 font-medium text-sm bg-white`}
            aria-current={pathname === href ? 'page' : undefined}
          >
            <span>{name}</span>
            <span className="inline-block ml-3 border border-gray-400 bg-gray-400 text-white w-5 text-center rounded-full text-xs">
              {count}
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Tabs;
