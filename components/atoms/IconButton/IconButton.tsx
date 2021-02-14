interface Props {
  srOnly?: string;
  className?: string;
}

const IconButton: React.FC<Props> = ({ srOnly, className, children }) => {
  return (
    <button className={className}>
      {srOnly && <span className="sr-only">{srOnly}</span>}
      {children}
    </button>
  );
};
const asjkh =
  'ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white';
export default IconButton;
