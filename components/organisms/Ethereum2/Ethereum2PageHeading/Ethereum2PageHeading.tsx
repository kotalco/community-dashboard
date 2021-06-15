import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup'

const links = [
  { name: 'Beacon Node', href: '/deployments/ethereum2/beaconnodes/create' },
  { name: 'Validator', href: '/deployments/ethereum2/validators/create' },
]

const Ethereum2PageHeading: React.FC = () => {
  return (
    <div className="flex">
      <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
        Ethereum 2.0
      </h1>

      <ButtonGroup label="Create New" buttons={links} />
    </div>
  )
}

export default Ethereum2PageHeading
