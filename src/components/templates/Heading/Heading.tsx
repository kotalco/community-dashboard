import Tooltip from '@components/atoms/Tooltip/Tooltip';
import { StatusData } from '@interfaces/StatusData';

interface Props {
  title: string;
  status?: StatusData;
}

const Heading: React.FC<Props> = ({ title, children, status }) => {
  return (
    <div className="flex pb-6">
      <h1 className="text-2xl font-nunito font-semibold text-gray-900 flex-grow">
        {status && (
          <Tooltip title={status.label}>
            <span className="flex h-3 w-3">
              <span
                style={{ backgroundColor: status.color }}
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}
              />
              <span
                style={{ background: status.color }}
                className={`relative inline-flex rounded-full h-3 w-3`}
              />
            </span>
          </Tooltip>
        )}{' '}
        {title}
      </h1>
      {children}
    </div>
  );
};

export default Heading;
