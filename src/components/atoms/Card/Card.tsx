import { InformationCircleIcon } from '@heroicons/react/outline';

import Tooltip from '../Tooltip/Tooltip';

interface Props {
  title: string;
  tooltipTitle?: string;
}

const Card: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  tooltipTitle,
  children,
}) => {
  return (
    <div className="px-4 py-5 bg-white rounded-lg shadow sm:p-6">
      <dt className="flex items-start text-2xl font-semibold text-gray-900 ">
        <span>{title}</span>
        {tooltipTitle && (
          <Tooltip title={tooltipTitle}>
            <InformationCircleIcon className="w-4 h-4" />
          </Tooltip>
        )}
      </dt>

      <dd className="mt-1 text-sm font-medium text-gray-500 truncate">
        {children}
      </dd>
    </div>
  );
};

export default Card;
