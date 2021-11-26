interface Props {
  title: string;
}

const Tooltip: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="inline-flex flex-col justify-center items-center relative group ml-1">
      {children}
      <div className="absolute z-[1000] bottom-0 group-hover:flex flex-col items-center hidden mb-6">
        <span className="relative p-2 text-xs rounded leading-none text-white whitespace-nowrap bg-gray-700 shadow-lg">
          {title}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700" />
      </div>
    </div>
  );
};

export default Tooltip;
