import { Dispatch, SetStateAction } from 'react';
import { MenuAlt1Icon, BellIcon } from '@heroicons/react/outline';

import IconButton from '@components/atoms/IconButton/IconButton';
import SearchForm from '@components/molecules/SearchForm/SearchForm';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ setIsOpen }) => {
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked');
  };

  return (
    <div className="relative z-10 shrink-0 flex h-16 bg-white shadow">
      <IconButton
        className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </IconButton>

      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <SearchForm />
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <IconButton
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
            onClick={handleClick}
          >
            <BellIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
