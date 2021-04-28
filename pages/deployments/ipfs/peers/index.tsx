import { GetStaticProps } from 'next'
import useSWR from 'swr'

import Layout from '@components/templates/Layout/Layout'
import Button from '@components/atoms/Button/Button'
import { getAllIPFSPeers } from '@utils/requests/ipfsPeersRequests'
import { IPFSPeer } from '@interfaces/IPFSPeer'

interface Props {
  peers: IPFSPeer[]
}

export const IPFSPeers: React.FC<Props> = ({ peers }) => {
  const { data, error } = useSWR(null, getAllIPFSPeers, {
    initialData: peers,
    revalidateOnMount: true,
  })
  console.log('Data: ', data)
  console.log('Error: ', error)

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
            IPFS Peers
          </h1>
          <Button
            href="/deployments/ethereum/nodes/create"
            className="btn btn-primary"
          >
            Create New Peer
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">peers</div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const peers = await getAllIPFSPeers()
    return { props: { peers } }
  } catch (e) {
    return { notFound: true }
  }
}

export default IPFSPeers
