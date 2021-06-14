import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { getEthereumNode } from '@utils/requests/ethereumNodeRequests'
// import StatsComponent from '@components/molecules/Stats/Stats'
import Tabs from '@components/organisms/Tabs/Tabs'
import Layout from '@components/templates/Layout/Layout'
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator'
import EthereumNodeDetails from '@components/organisms/Ethereum/EthereumNodeDetails/EthereumNodeDetails'
import DeleteEthereumNode from '@components/organisms/Ethereum/DeleteEthereumNode/DeleteEthereumNode'
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode'
import { tabTitles } from '@data/ethereum/node/tabTitles'

interface Props {
  ethereumNode: EthereumNode
}

const EthereumNodeDetailsPage: React.FC<Props> = ({ ethereumNode }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const { isFallback, query } = useRouter()
  const { nodeName } = query

  const { data } = useSWR(
    typeof nodeName === 'string' ? nodeName : null,
    getEthereumNode,
    {
      initialData: ethereumNode,
      revalidateOnMount: true,
    }
  )

  if (!data || isFallback) return <LoadingIndicator />

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">{ethereumNode.name}</h1>
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
          {activeTabIndex === 0 && <EthereumNodeDetails node={data} />}
          {activeTabIndex === 1 && <DeleteEthereumNode nodeName={data.name} />}
        </Tabs>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nodeName = context.params?.nodeName as string
  try {
    const ethereumNode = await getEthereumNode(nodeName)
    return { props: { ethereumNode }, revalidate: 10 }
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

export default EthereumNodeDetailsPage
