import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

// import { getEthereumNode } from '@utils/requests'
import PageDetailsHeader from '@components/molecules/PageDetailsHeader/PageDetailsHeader'
import StatsComponent from '@components/molecules/Stats/Stats'
import Tabs from '@components/organisms/Tabs/Tabs'
import Layout from '@components/templates/Layout/Layout'
import { EthereumNode } from '@interfaces/Node'

interface Params extends ParsedUrlQuery {
  nodeName: string
}

interface Props {
  node: EthereumNode
}

const EthereumNodeDetails: React.FC<Props> = ({ node }) => {
  return (
    <Layout>
      <div>Ethereum Node Details</div>
    </Layout>
  )
  // const { isFallback } = useRouter()

  // if (isFallback) {
  //   return <div>Loading...</div>
  // }

  // return (
  //   <Layout>
  //     <div className="py-6">
  //       <PageDetailsHeader nodeName={node.name} date="January 11, 2021" />

  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
  //         {/* Stats */}
  //         <div>
  //           <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
  //             <StatsComponent title="Last Block Number" content="11,971,897" />
  //             <StatsComponent title="Transactions Today" content="1,024,569" />
  //             <StatsComponent title="Connected Peers" content="21" />
  //           </dl>
  //         </div>

  //         <div className="bg-white overflow-hidden shadow rounded-lg divided-y divided-gray-200 mt-4">
  //           <Tabs node={node} />
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // )
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   let node: EthereumNode
//   try {
//     const { nodeName } = params as Params
//     node = await getEthereumNode(nodeName)
//   } catch (e) {
//     return { notFound: true }
//   }

//   return { props: { node }, revalidate: 1 }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }

export default EthereumNodeDetails
