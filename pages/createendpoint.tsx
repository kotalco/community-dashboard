import React from 'react';
import Typography from '@components/atoms/Typgraphy/Typography';
import Layout from '@components/templates/Layout/Layout';
import CreateEndpointForm from '@components/organisms/CreateEndpointForm/CreateEndpointForm';

const CreateEndpoint: React.FC = () => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <Typography
            variant="h1"
            className="text-2xl font-semibold text-gray-900 flex-grow"
          >
            Create New Endpoint
          </Typography>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-4">
            <CreateEndpointForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEndpoint;
