interface Props {
  srOnly?: boolean;
  htmlFor: string;
}

const InputLabel: React.FC<Props> = ({ srOnly, children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={`${srOnly ? 'sr-only' : ''}`}>
      {children}
    </label>
  );
};

export default InputLabel;
