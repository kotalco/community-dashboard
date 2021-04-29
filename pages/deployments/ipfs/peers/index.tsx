import { GetStaticProps } from 'next'
import useSWR from 'swr'

import Layout from '@components/templates/Layout/Layout'
import Button from '@components/atoms/Button/Button'
import List from '@components/organisms/List/List'
import ListItem from '@components/molecules/ListItem/ListItem'
import { getAllIPFSPeers } from '@utils/requests/ipfsPeersRequests'
import { IPFSPeer } from '@interfaces/IPFSPeer'

interface Props {
  peers: IPFSPeer[]
}

export const IPFSPeers: React.FC<Props> = ({ peers }) => {
  const { data } = useSWR(null, getAllIPFSPeers, {
    initialData: peers,
    revalidateOnMount: true,
  })

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
            IPFS Peers
          </h1>
          <Button
            href="/deployments/ipfs/peers/create"
            className="btn btn-primary"
          >
            Create New Peer
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <List>
              {data && data.length > 0 ? (
                <List>
                  {data.map(({ name }) => (
                    <ListItem
                      key={name}
                      link={`/deployments/ipfs/peers/${name}`}
                      title={name}
                    />
                  ))}
                </List>
              ) : (
                <p>There is no peers created</p>
              )}
            </List>
          </div>
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
