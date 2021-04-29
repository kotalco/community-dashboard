import { Dispatch, SetStateAction, useState } from 'react'

import TabsMobileView from '@components/molecules/TabsMobileView/TabsMobileView'
import TabsDesktopView from '@components/molecules/TabsDesktopView/TabsDesktopView'

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
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
}

const Tabs: React.FC<Props> = ({ activeIndex, setActiveIndex, children }) => {
  return (
    <>
      {/* Tabs Ttitles */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div>
          <TabsMobileView
            setActiveTabIndex={setActiveIndex}
            tabs={TAB_TITLES}
            activeTabIndex={activeIndex}
          />
          <TabsDesktopView
            setActiveTabIndex={setActiveIndex}
            tabs={TAB_TITLES}
            activeTabIndex={activeIndex}
          />
        </div>
      </div>

      {/* Tabs Content */}
      {children}
    </>
  )
}

export default Tabs
