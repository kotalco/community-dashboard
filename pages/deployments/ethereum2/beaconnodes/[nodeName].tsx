import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { getBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
// import StatsComponent from '@components/molecules/Stats/Stats'
import Tabs from '@components/organisms/Tabs/Tabs'
import Layout from '@components/templates/Layout/Layout'
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator'
import BeaconNodeProtocolTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeProtocolTab/BeaconNodeProtocolTab'
import BeaconNodeAPITab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeAPITab/BeaconNodeAPITab'
import BeaconNodeEthereumTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeEthereumTab/BeaconNodeEthereumTab'
import BeaconNodeResourcesTab from '@components/organisms/Ethereum2/BeaconNode/BeaconNodeResourcesTab/BeaconNodeResourcesTab'
import DeleteBeaconNode from '@components/organisms/Ethereum2/BeaconNode/DeleteBeaconNode/DeleteBeaconNode'
import { tabTitles } from '@data/ethereum2/beaconNode/tabTitles'
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode'

interface Props {
  beaconNode: Ethereum2BeaconNode
}

const Ethereum2NodeDetailsPage: React.FC<Props> = ({ beaconNode }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const { isFallback, query } = useRouter()
  const { nodeName } = query

  const { data } = useSWR(
    typeof nodeName === 'string' ? nodeName : null,
    getBeaconNode,
    {
      initialData: beaconNode,
      revalidateOnMount: true,
    }
  )

  if (!data || isFallback) return <LoadingIndicator />

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">{beaconNode.name}</h1>
      {/* <span className="text-xs text-gray-500">Last Updated on {date}</span> */}
      {/* Stats */}
      {/* <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatsComponent title="Last Block Number" content="11,971,897" />
            <StatsComponent title="Transactions Today" content="1,024,569" />
            <StatsComponent title="Connected Peers" content="21" />
          </dl>
        </div> */}

      <div className="bg-white overflow-hidden shadow rounded-lg divided-y divided-gray-200 mt-4">
        <Tabs
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
          tabs={tabTitles}
        >
          {activeTabIndex === 0 && (
            <BeaconNodeProtocolTab
              client={data.client}
              network={data.network}
            />
          )}
          {activeTabIndex === 1 && (
            <BeaconNodeEthereumTab
              name={data.name}
              client={data.client}
              eth1Endpoints={data.eth1Endpoints}
              network={data.network}
            />
          )}

          {activeTabIndex === 2 && (
            <BeaconNodeAPITab
              name={data.name}
              rest={data.rest}
              restHost={data.restHost}
              restPort={data.restPort}
              rpc={data.rpc}
              rpcPort={data.rpcPort}
              rpcHost={data.rpcHost}
              grpc={data.grpc}
              grpcHost={data.grpcHost}
              grpcPort={data.grpcPort}
              client={data.client}
            />
          )}
          {activeTabIndex === 3 && <BeaconNodeResourcesTab beaconnode={data} />}
          {activeTabIndex === 4 && <DeleteBeaconNode nodeName={data.name} />}
        </Tabs>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string
  try {
    const beaconNode = await getBeaconNode(nodeName)
    return { props: { beaconNode }, revalidate: 10 }
  } catch (e) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Ethereum2NodeDetailsPage
