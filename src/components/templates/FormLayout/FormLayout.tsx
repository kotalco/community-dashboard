import React from 'react';

import Button from '@components/atoms/Button/Button';

interface Props {
  isSubmitted: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  error?: string;
}

const CreateNode: React.FC<Props> = ({
  children,
  isSubmitted,
  isSubmitting,
  isValid,
  error,
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting}
          loading={isSubmitting}
        >
          Create
        </Button>

        {error && (
          <p aria-label="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateNode;
