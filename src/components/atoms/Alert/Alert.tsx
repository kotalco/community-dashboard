import { ExclamationIcon } from '@heroicons/react/outline';

const Alert: React.FC = ({ children }) => {
  return (
    <div className="max-w-lg p-4 text-sm rounded-md bg-yellow-50">
      <div className="flex">
        <div className="shrink-0">
          <ExclamationIcon
            className="w-5 h-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
