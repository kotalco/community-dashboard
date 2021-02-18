import React from 'react';
import Typography from '@components/atoms/Typgraphy/Typography';
import Layout from '@components/templates/Layout/Layout';
import CreateNodeForm from '@components/organisms/CreateNodeForm/CreateNodeForm';

const CreateNode: React.FC = () => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Typography variant="h1" className="text-2xl font-semibold">
            Create New Node
          </Typography>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-4">
            <CreateNodeForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateNode;
