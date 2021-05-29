import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import CreateBeaconNodeForm from '@components/organisms/Ethereum2/BeaconNode/CreateBeaconNodeForm/CreateBeaconNodeForm'

const CreateBeaconNode: React.FC = () => {
  return (
    <Layout>
      <FormLayout title="Create New Beacon Node">
        <CreateBeaconNodeForm />
      </FormLayout>
    </Layout>
  )
}

export default CreateBeaconNode
