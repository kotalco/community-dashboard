import React from 'react';

import Button from '@components/atoms/Button/Button';

interface Props {
  isSubmitted: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

const CreateNode: React.FC<Props> = ({
  children,
  isSubmitted,
  isSubmitting,
  isValid,
}) => {
  return (
    <div className="bg-white shadow rounded-lg mt-4">
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
      </div>
    </div>
  );
};

export default CreateNode;
