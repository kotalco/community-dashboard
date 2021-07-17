import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { GlobeAltIcon } from '@heroicons/react/solid'
import { ChipIcon } from '@heroicons/react/outline'
import useSWR from 'swr'

import Layout from '@components/templates/Layout/Layout'
import List from '@components/organisms/List/List'
import ListItem from '@components/molecules/ListItem/ListItem'
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel'
import LinkedTabs from '@components/organisms/LinkedTabs/LinkedTabs'
import ButtonGroup from '@components/molecules/ButtonGroup/ButtonGroup'
import Heading from '@components/templates/Heading/Heading'
import { useNotification } from '@components/contexts/NotificationContext'
import { getAllBeaconNodes } from '@utils/requests/ethereum2/beaconNodes'
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode'
import { resourcesTab, createButtons } from '@data/ethereum2/links'

interface Props {
  beaconNodes: Ethereum2BeaconNode[]
}

const Ethereum2Nodes: React.FC<Props> = ({ beaconNodes }) => {
  const { notificationData, removeNotification } = useNotification()

  const { data, error } = useSWR('/ethereum2/beaconnodes', getAllBeaconNodes, {
    initialData: beaconNodes,
    revalidateOnMount: true,
  })

  useEffect(() => {
    return () => removeNotification()
  }, [])

  if (error) return <p>failed to load nodes</p>

  return (
    <Layout>
      <Heading title="Etherium 2.0">
        <ButtonGroup label="Create New" buttons={createButtons} />
      </Heading>

      <div className="py-4">
        <LinkedTabs tabs={resourcesTab} />
        {data && data.length > 0 ? (
          <List>
            {data.map(({ name, client, network }) => (
              <ListItem
                key={name}
                link={`/deployments/ethereum2/beaconnodes/${name}`}
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
          <div className="bg-white p-4 text-center">
            <p>There is no beacon nodes created</p>
          </div>
        )}
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
    const beaconNodes = await getAllBeaconNodes()
    return { props: { beaconNodes }, revalidate: 10 }
  } catch (e) {
    return { notFound: true }
  }
}

export default Ethereum2Nodes
