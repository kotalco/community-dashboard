import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { GlobeAltIcon } from '@heroicons/react/solid'
import { ChipIcon } from '@heroicons/react/outline'
import useSWR from 'swr'

import Button from '@components/atoms/Button/Button'
import Layout from '@components/templates/Layout/Layout'
import List from '@components/organisms/List/List'
import ListItem from '@components/molecules/ListItem/ListItem'
import { useNotification } from '@components/contexts/NotificationContext'
import { getAllNodes } from '@utils/requests/ethereumNodeRequests'
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode'
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel'

interface Props {
  ethereumNodes: EthereumNode[]
}

const EthereumNodes: React.FC<Props> = ({ ethereumNodes }) => {
  const { notificationData, removeNotification } = useNotification()

  const { data, error } = useSWR('/ethereum/nodes', getAllNodes, {
    initialData: ethereumNodes,
    revalidateOnMount: true,
  })

  useEffect(() => {
    return () => removeNotification()
  }, [])

  if (error) return <p>failed to load nodes</p>

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
            Nodes
          </h1>
          <Button
            href="/deployments/ethereum/nodes/create"
            className="btn btn-primary"
          >
            Create New Node
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {data && data.length > 0 ? (
              <List>
                {data.map(({ name, client, network }) => (
                  <ListItem
                    key={name}
                    link={`/deployments/ethereum/nodes/${name}`}
                    title={name}
                  >
                    <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{client}</p>
                    <ChipIcon className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{network}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>There is no nodes created</p>
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
    const ethereumNodes = await getAllNodes()
    return { props: { ethereumNodes }, revalidate: 10 }
  } catch (e) {
    return { notFound: true }
  }
}

export default EthereumNodes
