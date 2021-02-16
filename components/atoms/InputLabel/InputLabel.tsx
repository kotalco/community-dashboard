interface Props {
  srOnly?: boolean;
  htmlFor: string;
  className?: string;
}

const InputLabel: React.FC<Props> = ({
  srOnly,
  children,
  htmlFor,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${srOnly ? 'sr-only' : ''} ${className ? className : ''}`}
    >
      {children}
    </label>
  );
};

export default InputLabel;
