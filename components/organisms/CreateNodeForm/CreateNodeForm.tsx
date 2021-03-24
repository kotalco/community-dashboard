import React, { useState } from 'react'
import Router from 'next/router'

import Typography from '@components/atoms/Typgraphy/Typography'
import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import CreateIPFSNodeForm from '@components/organisms/CreateIPFSNodeForm/CreateIPFSNodeForm'

const CreateNodeForm: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const submitForm = () => {
    Router.push('/')
  }

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

          <CreateIPFSNodeForm showAdvanced={showAdvanced} />

          {/* <!-- end: content here --> */}
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button onClick={submitForm}>Create</Button>
        </div>
      </div>
    </form>
  )
}

export default CreateNodeForm
