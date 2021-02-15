interface Props {
  srOnly?: string;
  className?: string;
  onClick: () => void;
}

const IconButton: React.FC<Props> = (props) => {
  const { srOnly, className, onClick, children } = props;

  return (
    <button className={className} onClick={onClick}>
      {srOnly && <span className="sr-only">{srOnly}</span>}
      {children}
    </button>
  );
};

export default IconButton;
