import CopyIcon from '@components/Icons/CopyIcon/CopyIcon';

interface Props {
  id: string;
  label: string;
  name: string;
  value: string;
}

const TextInputWithButton: React.FC<Props> = ({ id, label, name, value }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm w-3/4">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name={name}
            id={id}
            value={value}
            disabled
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
          />
        </div>
        <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <CopyIcon />
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
};

export default TextInputWithButton;
