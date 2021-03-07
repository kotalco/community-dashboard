import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'

const ProtocolTabContent = () => {
  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Ethereum</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Chain
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Rinkeby</span>
          </dd>
        </dl>
        <div className="mt-4">
          <Select
            options={[
              'Go Ethereum',
              'Hyperledger Besu',
              'Open Ethereum',
              'Nethermind',
            ]}
            name="location"
            label="Client Software"
            id="location"
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button onClick={() => {}}>Save</Button>
      </div>
    </>
  )
}

export default ProtocolTabContent
