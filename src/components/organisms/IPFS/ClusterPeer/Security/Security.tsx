import React from 'react';

interface Props {
  clusterSecretName: string;
}

const Security: React.FC<Props> = ({ clusterSecretName }) => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dl>
        <dt className="block text-sm font-medium text-gray-700">
          Cluster Secret Name:
        </dt>
        <dd className="text-gray-500 text-sm">{clusterSecretName}</dd>
      </dl>
    </div>
  );
};

export default Security;
