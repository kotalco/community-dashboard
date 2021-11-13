interface Props {
  title: string;
}

const Heading: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex pb-6">
      <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default Heading;
