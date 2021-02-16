import React, { useState } from 'react';

import Typography from '@components/atoms/Typgraphy/Typography';
import Input from '@components/atoms/Input/Input';
import InputLabel from '@components/atoms/InputLabel/InputLabel';
import Select from '@components/molecules/Select/Select';

const CreateNodeForm: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

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
              <label
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                IPFS Client
              </label>
              <select
                id="client"
                name="client"
                className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>go-ipfs</option>
                <option disabled>js-ipfs</option>
              </select>
            </div>

            {/* <!-- configuration profiles --> */}
            <div className="mt-4">
              <label
                htmlFor="server"
                className="block text-sm font-medium text-gray-700"
              >
                Configuration Profiles
              </label>
              <div className="max-w-lg space-y-2 mt-1">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="server"
                      name="server"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="server"
                      className="font-medium text-gray-700"
                    >
                      server
                    </label>
                    {/* <!-- <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> --> */}
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="randomports"
                        name="randomports"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="randomports"
                        className="font-medium text-gray-700"
                      >
                        randomports
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate applies for a job.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="default-datastore"
                        name="default-datastore"
                        type="checkbox"
                        checked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="default-datastore"
                        className="font-medium text-gray-700"
                      >
                        default-datastore
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="local-discovery"
                        name="local-discovery"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="local-discovery"
                        className="font-medium text-gray-700"
                      >
                        local-discovery
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="test"
                        name="test"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="test"
                        className="font-medium text-gray-700"
                      >
                        test
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="default-networking"
                        name="default-networking"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="default-networking"
                        className="font-medium text-gray-700"
                      >
                        default-networking
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="flatfs"
                        name="flatfs"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="flatfs"
                        className="font-medium text-gray-700"
                      >
                        flatfs
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="badgerds"
                        name="badgerds"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="badgerds"
                        className="font-medium text-gray-700"
                      >
                        badgerds
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="lowpower"
                        name="lowpower"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="lowpower"
                        className="font-medium text-gray-700"
                      >
                        lowpower
                      </label>
                      {/* <!-- <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end: configuration profiles -->

                                            <!-- Resources Options --> */}
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
                    <label
                      htmlFor="required_cpu"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Required CPU Cores
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="required_cpu"
                        id="required_cpu"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                        value="2"
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
                    <label
                      htmlFor="limited_cpu"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum CPU Cores
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="limited_cpu"
                        id="limited_cpu"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                        value="4"
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
                    <label
                      htmlFor="required_memory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Required Memory
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="required_memory"
                        id="required_memory"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                        value="4"
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
                    <label
                      htmlFor="limited_memory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum Memory
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="limited_memory"
                        id="limited_memory"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                        value="8"
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
                    <label
                      htmlFor="required_storage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disk Storage
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="required_storage"
                        id="required_storage"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                        value="500"
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
          <a
            href="index-new.html"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </a>
        </div>
      </div>
    </form>
  );
};

export default CreateNodeForm;
