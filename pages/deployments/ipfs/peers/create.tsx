import React from 'react'
import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import CreateIPFSPeerForm from '@components/organisms/CreateIPFSPeerForm/CreateIPFSPeerForm'

const CreateIPFSPeer: React.FC = () => {
  return (
    <Layout>
      <FormLayout title="Create New Peer">
        <CreateIPFSPeerForm />
      </FormLayout>
    </Layout>
  )
}

export default CreateIPFSPeer
