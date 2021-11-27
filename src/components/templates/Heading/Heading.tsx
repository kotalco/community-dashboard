import Tooltip from '@components/atoms/Tooltip/Tooltip';
import { StatusData } from '@interfaces/StatusData';

interface Props {
  title: string;
  status?: StatusData;
  createdDate?: string;
}

const Heading: React.FC<Props> = ({ title, children, status, createdDate }) => {
  return (
    <div className="flex justify-between pb-6">
      <div>
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
        {createdDate && (
          <p className="ml-6 text-sm text-gray-500">
            Created at{' '}
            {new Date(createdDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default Heading;
