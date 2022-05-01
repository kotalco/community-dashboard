interface Props {
  title: string;
}

const Tooltip: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <div className="relative inline-flex flex-col items-center justify-center ml-1 group">
      {children}
      <div className="absolute z-[1000] bottom-0 group-hover:flex flex-col items-center hidden mb-6">
        <span className="relative p-2 text-xs leading-none text-white bg-gray-700 rounded shadow-lg whitespace-nowrap">
          {title}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700" />
      </div>
    </div>
  );
};

export default Tooltip;
