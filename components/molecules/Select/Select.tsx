interface Props {
  options: string[];
  name: string;
  id?: string;
}

const Select: React.FC<Props> = ({ options, name, id }) => {
  return (
    <select
      id={id}
      name={name}
      className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  );
};

export default Select;
