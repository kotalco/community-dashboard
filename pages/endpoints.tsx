import React from 'react';
import Link from 'next/link';

import Typography from '@components/atoms/Typgraphy/Typography';
import Layout from '@components/templates/Layout/Layout';
import EndPointsList from '@components/organisms/EndpointsList/EndpointsList';

const Endpoints: React.FC = () => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <Typography
            variant="h1"
            className="text-2xl font-semibold text-gray-900 flex-grow"
          >
            Endpoints
          </Typography>
          <Link href="/createendpoint">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create New Endpoint
            </a>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <EndPointsList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Endpoints;
