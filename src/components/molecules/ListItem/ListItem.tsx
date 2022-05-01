import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

interface Props {
  link: string;
  title: string;
  children?: ReactNode;
}

const NodeItem: React.FC<React.PropsWithChildren<Props>> = ({
  link,
  title,
  children,
}) => {
  return (
    <li>
      <Link href={link}>
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex text-sm font-medium text-indigo-600 truncate">
                  <p>{title}</p>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 shrink-0">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default NodeItem;
