import InputLabel from '@components/atoms/InputLabel/InputLabel';
import SearchIcon from '@components/Icons/SearchIcon/SearchIcon';
import Input from '@components/atoms/Input/Input';

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
        <Input
          id="search_field"
          placeholder="search"
          type="search"
          name="search"
        />
      </div>
    </form>
  );
};

export default SearchForm;
