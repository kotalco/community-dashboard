import { useEffect, useState } from 'react'
import { InferGetStaticPropsType } from 'next'
import useSWR from 'swr'

import Button from '@components/atoms/Button/Button'
import Layout from '@components/templates/Layout/Layout'
import NodesList from '@components/organisms/NodesList/NodesList'
import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel'
import { getAllNodes } from '@utils/requests'
import { EthereumNode } from '@interfaces/Node'

function EthereumNodes({
  nodes,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  const [node, setNode] = useState<EthereumNode>()

  const { data, error } = useSWR('ethereum', getAllNodes, {
    initialData: nodes,
    revalidateOnMount: true,
  })

  useEffect(() => {
    let node: EthereumNode
    const storedNode = localStorage.getItem('node')
    if (storedNode) {
      node = JSON.parse(storedNode)
      setNode(node)
      localStorage.removeItem('node')
    }
  }, [])

  if (error) return <p>failed to load nodes</p>

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <h1 className="text-2xl font-semibold text-gray-900 flex-grow">
            Nodes
          </h1>
          <Button href="/createnode" className="btn btn-primary">
            Create New Node
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {data && data.length !== 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <NodesList nodes={data} />
              </div>
            ) : (
              <p>There is no nodes created</p>
            )}
          </div>
        </div>
      </div>
      {node && (
        <NotificationPanel
          title="Node has been created successfully!"
          name={node.name}
          type="Ethereum Node"
        />
      )}
    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  const nodes = await getAllNodes('ethereum')

  return {
    props: { nodes },
    revalidate: 1,
  }
}

export default EthereumNodes
