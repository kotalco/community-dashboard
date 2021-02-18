import InputLabel from '@components/atoms/InputLabel/InputLabel';
import SearchIcon from '@components/Icons/SearchIcon/SearchIcon';

const SearchForm: React.FC = () => {
  return (
    <form className="w-full flex md:ml-0" action="#" method="GET">
      <InputLabel htmlFor="search_field" srOnly>
        Search
      </InputLabel>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          id="search_field"
          placeholder="search"
          type="search"
          name="search"
          className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
        />
      </div>
    </form>
  );
};

export default SearchForm;
