import React from 'react'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'

import Typography from '@components/atoms/Typgraphy/Typography'
import Layout from '@components/templates/Layout/Layout'
import NodesList from '@components/organisms/NodesList/NodesList'
// import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel'
import { getAllNodes } from '@utils/requests'

function Home({
  nodes,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <Typography
            variant="h1"
            className="text-2xl font-semibold text-gray-900 flex-grow"
          >
            Nodes
          </Typography>
          <Link href="/createnode">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create New Node
            </a>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <NodesList nodes={nodes} />
            </div>
          </div>
        </div>
      </div>
      {/* <NotificationPanel
        title="Node has been created successfully!"
        name="my-ipfs-node"
        type="IPFS node"
      /> */}
    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  const nodes = await getAllNodes('ethereum')

  return {
    props: { nodes },
    revalidate: 20,
  }
}

export default Home
