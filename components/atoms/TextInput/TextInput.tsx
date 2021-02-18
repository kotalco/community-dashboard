interface Props {
  id?: string;
  name: string;
}

const TextInput: React.FC<Props> = ({ id, name }) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
    />
  );
};

export default TextInput;
