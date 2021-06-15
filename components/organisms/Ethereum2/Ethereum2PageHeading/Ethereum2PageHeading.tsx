import Button from '@components/atoms/Button/Button'

const Ethereum2PageHeading: React.FC = () => {
  return (
    <div className="flex">
      <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
        Ethereum 2.0
      </h1>
      <Button
        href="/deployments/ethereum2/beaconnodes/create"
        className="btn btn-primary"
      >
        Create New Beacon Node
      </Button>
    </div>
  )
}

export default Ethereum2PageHeading
