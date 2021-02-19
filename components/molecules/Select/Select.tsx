import InputLabel from '@components/atoms/InputLabel/InputLabel';

interface Props {
  options: string[];
  name: string;
  id?: string;
  label: string;
}

const Select: React.FC<Props> = ({ options, name, id, label }) => {
  return (
    <div className="mt-4">
      <InputLabel
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </InputLabel>
      <select
        id={id}
        name={name}
        className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
