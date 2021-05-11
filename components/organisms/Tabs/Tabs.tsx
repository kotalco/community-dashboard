import { Dispatch, SetStateAction } from 'react'

import TabsMobileView from '@components/molecules/TabsMobileView/TabsMobileView'
import TabsDesktopView from '@components/molecules/TabsDesktopView/TabsDesktopView'

interface Props {
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  tabs: string[]
}

const Tabs: React.FC<Props> = ({
  activeIndex,
  setActiveIndex,
  tabs,
  children,
}) => {
  return (
    <>
      {/* Tabs Ttitles */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div>
          <TabsMobileView
            setActiveTabIndex={setActiveIndex}
            tabs={tabs}
            activeTabIndex={activeIndex}
          />
          <TabsDesktopView
            setActiveTabIndex={setActiveIndex}
            tabs={tabs}
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
