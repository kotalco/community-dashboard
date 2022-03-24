import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/outline';
import React, { PropsWithChildren } from 'react';

interface Props {
  role: 'warn' | 'sucess';
}

const Alert: React.FC<PropsWithChildren<Props>> = ({ children, role }) => {
  return (
    <div
      className={`max-w-lg p-4 text-sm rounded-md ${
        role === 'warn' ? 'bg-yellow-50' : 'bg-green-50'
      }`}
    >
      <div className="flex">
        <div className="shrink-0">
          {role === 'warn' && (
            <ExclamationIcon
              className="w-5 h-5 text-yellow-400"
              aria-hidden="true"
            />
          )}
          {role === 'sucess' && (
            <CheckCircleIcon
              className="w-5 h-5 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
