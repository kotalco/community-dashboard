interface Props {
  title: string;
  date: string;
}

const PageDetailsHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <span className="text-xs text-gray-500">Last Updated on {date}</span>
    </div>
  );
};

export default PageDetailsHeader;
