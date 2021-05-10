import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import useSWR from 'swr'

import Layout from '@components/templates/Layout/Layout'
import Button from '@components/atoms/Button/Button'
import List from '@components/organisms/List/List'
import ListItem from '@components/molecules/ListItem/ListItem'
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel'
import { getAllIPFSPeers } from '@utils/requests/ipfsPeersRequests'
import { IPFSPeer } from '@interfaces/IPFSPeer'
import { useNotification } from '@components/contexts/NotificationContext'

interface Props {
  peers: IPFSPeer[]
}

export const IPFSPeers: React.FC<Props> = ({ peers }) => {
  const { notificationData, removeNotification } = useNotification()

  const { data } = useSWR('/ipfs/peers', getAllIPFSPeers, {
    initialData: peers,
    revalidateOnMount: true,
  })

  useEffect(() => {
    return () => {
      removeNotification
    }
  }, [])

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
          </div>
        </div>
      </div>

      <NotificationPanel
        show={!!notificationData}
        title={notificationData?.title}
        close={removeNotification}
      >
        <p className="mt-1 text-sm text-gray-500">
          <span className="text-indigo-900 bg-indigo-100 p-1 m-1 ml-0 rounded-md">
            {notificationData?.name}
          </span>{' '}
          {`${notificationData?.protocol} has been ${notificationData?.action}`}
        </p>
      </NotificationPanel>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const peers = await getAllIPFSPeers()
    return { props: { peers }, revalidate: 10 }
  } catch (e) {
    return { notFound: true }
  }
}

export default IPFSPeers
