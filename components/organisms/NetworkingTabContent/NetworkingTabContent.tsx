import { useState } from 'react'

import TextInputWithButton from '@components/molecules/TextInputWithButton/TextInputWithButton'
import Toggle from '@components/molecules/Toggle/Toggle'
import Textarea from '@components/molecules/Textarea/Textarea'
import Button from '@components/atoms/Button/Button'

const NetworkingTabContent: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked')
  }

  return (
    <div>
      <div className="px-4 py-5 sm:p-6">
        <TextInputWithButton
          id="node_url"
          label="Ethereum Node URL"
          name="nodeUrl"
          value="enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303"
        />

        <div className="mt-4">
          <Toggle
            id="boot_node"
            label="Bootnode"
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
        </div>

        <div className="mt-4">
          <Textarea
            id="bootnodes"
            helperText="One Ethereum node URL per line."
            label="Bootnodes"
          />
        </div>

        <div className="mt-4">
          <Textarea
            id="staticnodes"
            helperText="One Ethereum node URL per line."
            label="Static nodes"
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button onClick={handleClick}>Save</Button>
      </div>
    </div>
  )
}

export default NetworkingTabContent
