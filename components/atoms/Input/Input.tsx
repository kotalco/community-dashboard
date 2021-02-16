interface Props {
  id?: string;
  placeholder?: string;
  type: string;
  name: string;
}

const Input: React.FC<Props> = ({ id, placeholder, type, name }) => {
  return (
    <input
      id={id}
      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
      placeholder={placeholder}
      type={type}
      name={name}
    />
  );
};

export default Input;
