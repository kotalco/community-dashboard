import SearchIcon from '@heroicons/react/solid/SearchIcon';

const SearchForm: React.FC = () => {
  return (
    <div className="flex w-full md:ml-0">
      <label className="sr-only" htmlFor="search_field">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <input
          id="search_field"
          placeholder="search"
          type="search"
          name="search"
          className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
        />
      </div>
    </div>
  );
};

export default SearchForm;
