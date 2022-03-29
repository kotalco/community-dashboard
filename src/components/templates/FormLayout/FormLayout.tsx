import React from 'react';

const CreateNode: React.FC = ({ children }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};

export default CreateNode;
