import React, { useState } from 'react';
import Router from 'next/router';

import Typography from '@components/atoms/Typgraphy/Typography';
import TextInput from '@components/atoms/TextInput/TextInput';
import InputLabel from '@components/atoms/InputLabel/InputLabel';
import Select from '@components/molecules/Select/Select';
import CheckBox from '@components/atoms/CheckBox/CheckBox';
import Button from '@components/atoms/Button/Button';
import Separator from '@components/atoms/Separator/Separator';
import UnitTextInput from '../UnitTextInput/UnitTextInput';

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
          <TextInput name="node_name" id="node_name" label="Node Name" />

          {/* Blockchain Protocol */}
          <Select
            label="Blockchain Protocol"
            options={['Ethereum', 'Ethereum 2.0', 'Filecoin', 'IPFS']}
            name="protocol"
          />

          {/* Show Advanced Setting */}
          <div
            className={`block mt-4 text-red-500 cursor-pointer hover:text-red-600 ${
              showAdvanced ? 'hidden' : ''
            }`}
            onClick={() => setShowAdvanced(true)}
          >
            Show Advanced Settings
            <Typography variant="p" className="text-black">
              I know what I am doing
            </Typography>
          </div>

          <div className={`${showAdvanced ? 'block' : 'hidden'}`}>
            {/* IPFS Client */}
            <Select
              label="IPFS Client"
              options={['go-ipfs', 'js-ipfs']}
              name="client"
              id="client"
            />

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
            <Separator label="Node Resources Options" />

            <div>
              {/* Required CPU Cores */}
              <UnitTextInput
                label="Required CPU Cores"
                id="required_cpu"
                name="required_cpu"
                value="2"
                unit="Core"
              />

              {/* Maximum CPU Cores */}
              <UnitTextInput
                label="Maximum CPU Cores"
                id="limited_cpu"
                name="limited_cpu"
                value="4"
                unit="Core"
              />

              {/* Required Memory */}
              <UnitTextInput
                label="Required Memory"
                id="required_memory"
                name="required_memory"
                value="4"
                unit="Gigabyte"
              />

              {/* Maximum Memory */}
              <UnitTextInput
                label="Maximum Memory"
                id="limited_memory"
                name="limited_memory"
                value="8"
                unit="Gigabyte"
              />

              {/* Disk Storage */}
              <UnitTextInput
                label="Disk Storage"
                id="required_storage"
                name="required_storage"
                value="500"
                unit="Gigabyte"
              />
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
