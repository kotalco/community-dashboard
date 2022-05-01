interface IconProps {
  className: string;
}

interface Props {
  label?: string;
  name: string;
  value: string;
  disabled?: boolean;
  Icon?: React.ComponentType<React.PropsWithChildren<IconProps>>;
}

const TextInputWithButton: React.FC<React.PropsWithChildren<Props>> = ({
  label,
  name,
  value,
  disabled,
  Icon,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="flex w-3/4 mt-1 rounded-md shadow-sm">
        <div className="relative flex items-stretch grow focus-within:z-10">
          <input
            type="text"
            name={name}
            id={name}
            value={value}
            disabled={disabled}
            className="block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
          />
        </div>
        <button className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          {Icon && <Icon className="w-5 h-5 text-gray-400" />}
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
};

export default TextInputWithButton;
