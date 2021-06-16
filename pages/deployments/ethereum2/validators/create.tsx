import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import CreateValidatorForm from '@components/organisms/Ethereum2/Validator/CreateValidatorForm/CreateValidatorForm'

const CreateValidator: React.FC = () => {
  return (
    <Layout>
      <FormLayout title="Create New Validator">
        <CreateValidatorForm />
      </FormLayout>
    </Layout>
  )
}

export default CreateValidator
