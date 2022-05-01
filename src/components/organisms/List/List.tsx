const NodesList: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <div className="bg-white shadow">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </div>
  );
};

export default NodesList;
