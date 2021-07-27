interface Props {
  htmlFor: string;
  children: string;
  labelClassName?: string;
}

const InputLabel: React.FC<Props> = ({ children, htmlFor, labelClassName }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        labelClassName ? labelClassName : ''
      } block text-sm font-medium text-gray-700 mb-1`}
    >
      {children}
    </label>
  );
};

export default InputLabel;
