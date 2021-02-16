import Router from 'next/router';

import Input from '@components/atoms/Input/Input';
import InputLabel from '@components/atoms/InputLabel/InputLabel';
import Button from '@components/atoms/Button/Button';

const CreateEndpoint: React.FC = () => {
  const submitForm = () => {
    Router.push('/endpoints');
  };

  return (
    <form>
      <div>
        <div className="px-4 py-5 sm:p-6">
          {/* Endpoint name */}
          <div>
            <InputLabel
              htmlFor="node_name"
              className="block text-sm font-medium text-gray-700"
            >
              Endpoint Name
            </InputLabel>
            <div className="mt-1">
              <Input
                type="text"
                name="node_name"
                id="node_name"
                placeholder="Endpoint Name"
              />
            </div>
          </div>

          {/* Node name */}
          <div className="mt-4">
            <InputLabel
              htmlFor="node"
              className="block text-sm font-medium text-gray-700"
            >
              Node
            </InputLabel>
            <select
              id="node"
              name="node"
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>my-beacon-node</option>
              <option>my-ipfs-node</option>
              <option>my-filecoin-node</option>
              <option>my-ethereum-node</option>
            </select>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            onClick={submitForm}
            // className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateEndpoint;
