import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Layout from '@components/templates/Layout/Layout'
import PageDetailsHeader from '@components/molecules/PageDetailsHeader/PageDetailsHeader'
import StatsComponent from '@components/molecules/Stats/Stats'
import LoadingIndicator from '@components/molecules/LoadingIndicator/LoadingIndicator'
import DeleteIPFSPeer from '@components/organisms/IPFS/DeleteIPFSPeer/DeleteIPFSPeer'
import Tabs from '@components/organisms/Tabs/Tabs'
import IPFSProtocolDetails from '@components/organisms/IPFS/IPFSProtocolDetails/IPFSProtocolDetails'
import IPFSConfigrationProfiles from '@components/organisms/IPFS/IPFSConfigrationProfiles/IPFSConfigrationProfiles'
import IPFSApiDetails from '@components/organisms/IPFS/IPFSApiDetails/IPFSApiDetails'
import IPFSGatewayDetails from '@components/organisms/IPFS/IPFSGatewayDetails/IPFSGatewayDetails'
import IPFSRoutingDetails from '@components/organisms/IPFS/IPFSRoutingDetails/IPFSRoutingDetails'
import { getIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer'
import { tabsTitles } from '@data/ipfs/peers/tabsTitles'

interface Props {
  ipfsPeer: IPFSPeer
}

const IPFSPeerDetailsPage: React.FC<Props> = ({ ipfsPeer }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const { isFallback, query } = useRouter()
  const { peerName } = query

  const { data } = useSWR(
    typeof peerName === 'string' ? peerName : null,
    getIPFSPeer,
    {
      initialData: ipfsPeer,
      revalidateOnMount: true,
    }
  )

  if (!data || isFallback) return <LoadingIndicator />

  return (
    <Layout>
      <div className="py-6">
        <PageDetailsHeader title={data.name} date="January 11, 2021" />

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
              tabs={tabsTitles}
            >
              {activeTabIndex === 0 && <IPFSProtocolDetails />}
              {activeTabIndex === 1 && (
                <IPFSConfigrationProfiles
                  peerName={data.name}
                  profiles={data.profiles}
                  initProfiles={data.initProfiles}
                />
              )}
              {activeTabIndex === 2 && (
                <IPFSApiDetails
                  peerName={data.name}
                  apiPort={data.apiPort}
                  apiHost={data.apiHost}
                />
              )}
              {activeTabIndex === 3 && (
                <IPFSGatewayDetails
                  peerName={data.name}
                  gatewayPort={data.gatewayPort}
                  gatewayHost={data.gatewayHost}
                />
              )}
              {activeTabIndex === 4 && (
                <IPFSRoutingDetails
                  peerName={data.name}
                  routing={data.routing}
                />
              )}
              {activeTabIndex === 5 && <DeleteIPFSPeer peerName={data.name} />}
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const peerName = context.params?.peerName as string
  try {
    const ipfsPeer = await getIPFSPeer(peerName)

    return { props: { ipfsPeer } }
  } catch (e) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default IPFSPeerDetailsPage
