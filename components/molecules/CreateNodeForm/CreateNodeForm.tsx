import React, { useState } from 'react';
import Router from 'next/router';

import Typography from '@components/atoms/Typgraphy/Typography';
import Input from '@components/atoms/Input/Input';
import InputLabel from '@components/atoms/InputLabel/InputLabel';
import Select from '@components/molecules/Select/Select';
import CheckBox from '@components/atoms/CheckBox/CheckBox';
import Button from '@components/atoms/Button/Button';

const CreateNodeForm: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const submitForm = () => {
    Router.push('/');
  };

  return (
    <form>
      <div>
        <div className="px-4 py-5 sm:p-6">
          {/* Node Name */}
          <div>
            <InputLabel
              htmlFor="node_name"
              className="block text-sm font-medium text-gray-700"
            >
              Node Name
            </InputLabel>
            <div className="mt-1">
              <Input
                type="text"
                name="node_name"
                id="node_name"
                placeholder="Node Name"
                // className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Blockchain Protocol */}
          <div className="mt-4">
            <InputLabel
              htmlFor="protocol"
              className="block text-sm font-medium text-gray-700"
            >
              Blockchain Protocol
            </InputLabel>
            <Select
              options={['Ethereum', 'Ethereum 2.0', 'Filecoin', 'IPFS']}
              name="protocol"
            />
          </div>

          <div
            className="block mt-4 text-red-500 cursor-pointer hover:text-red-600"
            onClick={() => setShowAdvanced(true)}
          >
            Show Advanced Settings
            <Typography variant="p" className="text-black">
              I know what I am doing
            </Typography>
          </div>

          <div className={`${showAdvanced ? 'block' : 'hidden'}`}>
            <div className="mt-4">
              <InputLabel
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                IPFS Client
              </InputLabel>
              <Select
                options={['go-ipfs', 'disabled>js-ipfs']}
                name="client"
                id="client"
              />
            </div>

            {/* <!-- configuration profiles --> */}
            <div className="mt-4">
              <Typography
                variant="p"
                className="block text-sm font-medium text-gray-700"
              >
                Configuration Profiles
              </Typography>
              <div className="max-w-lg space-y-2 mt-1">
                <CheckBox id="server" name="server" label="server" />
                <CheckBox
                  id="randomports"
                  name="randomports"
                  label="randomports"
                />
                <CheckBox
                  id="default-datastore"
                  name="default-datastore"
                  label="default-datastore"
                />
                <CheckBox
                  id="local-discovery"
                  name="local-discovery"
                  label="local-discovery"
                />
                <CheckBox id="test" name="test" label="test" />
                <CheckBox
                  id="default-networking"
                  name="default-networking"
                  label="default-networking"
                />
                <CheckBox id="flatfs" name="flatfs" label="flatfs" />
                <CheckBox id="bodgerds" name="bodgerds" label="bodgerds" />
                <CheckBox id="lowpower" name="lowpower" label="lowpower" />
              </div>
            </div>

            {/* Resources Options */}
            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-300">
                  Node Resources Options
                </span>
              </div>
            </div>
            {/* <!-- end: Resources Options --> */}

            <div>
              <div className="w-48 mt-4">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="required_cpu"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Required CPU Cores
                    </InputLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        type="text"
                        name="required_cpu"
                        id="required_cpu"
                        aria-describedby="required_cpu"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="required_cpu_unit"
                        >
                          Core
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-48 mt-4">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="limited_cpu"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum CPU Cores
                    </InputLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        type="text"
                        name="limited_cpu"
                        id="limited_cpu"
                        aria-describedby="limited_cpu"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="limited_cpu_unit"
                        >
                          Core
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-48 mt-4">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="required_memory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Required Memory
                    </InputLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        type="text"
                        name="required_memory"
                        id="required_memory"
                        aria-describedby="required_memory"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="required_memory_unit"
                        >
                          Gigabyte
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-48 mt-4">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="limited_memory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum Memory
                    </InputLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        type="text"
                        name="limited_memory"
                        id="limited_memory"
                        aria-describedby="limited_memory"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="limited_memory_unit"
                        >
                          Gigabyte
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-48 mt-4">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="required_storage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disk Storage
                    </InputLabel>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        type="text"
                        name="required_storage"
                        id="required_storage"
                        aria-describedby="required_storage"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="required_storage_unit"
                        >
                          Gigabyte
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- end: content here --> */}
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button onClick={submitForm}>Create</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateNodeForm;
