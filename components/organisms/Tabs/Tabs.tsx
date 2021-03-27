import { useState } from 'react'

import TabsMobileView from '@components/molecules/TabsMobileView/TabsMobileView'
import TabsDesktopView from '@components/molecules/TabsDesktopView/TabsDesktopView'
import ProtocolTabContent from '@components/organisms/ProtocolTabContent/ProtocolTabContent'
import NetworkingTabContent from '@components/organisms/NetworkingTabContent/NetworkingTabContent'
import DangerousZoneContent from '@components/organisms/DangerousZoneContent/DangerousZoneContent'
import { EthereumNode } from '@interfaces/Node'

const TAB_TITLES = [
  'Protocol',
  'Networking',
  'API',
  'Whitelisting',
  'Mining',
  'Resources',
  'Dangerous Zone',
]

interface Props {
  node: EthereumNode
}

const Tabs: React.FC<Props> = ({ node }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div>
          <TabsMobileView
            setActiveTabIndex={setActiveTabIndex}
            tabs={TAB_TITLES}
            activeTabIndex={activeTabIndex}
          />
          <TabsDesktopView
            setActiveTabIndex={setActiveTabIndex}
            tabs={TAB_TITLES}
            activeTabIndex={activeTabIndex}
          />
        </div>
      </div>

      {/* Content */}
      {activeTabIndex === 0 && <ProtocolTabContent node={node} />}
      {activeTabIndex === 1 && <NetworkingTabContent />}
      {activeTabIndex === 2 && <div />}
      {activeTabIndex === 3 && <div />}
      {activeTabIndex === 4 && <div />}
      {activeTabIndex === 5 && <div />}
      {activeTabIndex === 6 && <DangerousZoneContent nodeName={node.name} />}
    </>
  )
}

export default Tabs
