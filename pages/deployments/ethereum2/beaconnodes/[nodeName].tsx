import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { getBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import PageDetailsHeader from '@components/molecules/PageDetailsHeader/PageDetailsHeader'
import StatsComponent from '@components/molecules/Stats/Stats'
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
      <div className="py-6">
        <PageDetailsHeader title={beaconNode.name} date="January 11, 2021" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <StatsComponent title="Last Block Number" content="11,971,897" />
              <StatsComponent title="Transactions Today" content="1,024,569" />
              <StatsComponent title="Connected Peers" content="21" />
            </dl>
          </div>

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
                <BeaconNodeEthereumTab beaconnode={data} />
              )}

              {activeTabIndex === 2 && <BeaconNodeAPITab beaconnode={data} />}
              {activeTabIndex === 3 && (
                <BeaconNodeResourcesTab beaconnode={data} />
              )}
              {activeTabIndex === 4 && (
                <DeleteBeaconNode nodeName={data.name} />
              )}
            </Tabs>
          </div>
        </div>
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
