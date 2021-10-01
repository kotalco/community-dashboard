import Button from '@components/atoms/Button/Button';
import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';

interface Props {
  title: string;
  description: string;
  linkName: string;
  linkUrl: string;
}

const EmptyState: React.FC<Props> = ({
  children,
  title,
  description,
  linkName,
  linkUrl,
}) => {
  return (
    <div className="text-center bg-white py-6 mt-6 rounded-tr-md rounded-b-md">
      {children}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        <Button href={linkUrl} className="btn btn-primary">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {linkName}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
