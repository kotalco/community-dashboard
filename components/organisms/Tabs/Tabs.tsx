import { useState } from 'react';

import TabsMobileView from '@components/molecules/TabsMobileView/TabsMobileView';
import TabsDesktopView from '@components/molecules/TabsDesktopView/TabsDesktopView';
import ProtocolTabContent from '@components/organisms/ProtocolTabContent/ProtocolTabContent';
import NetworkingTabContent from '@components/organisms/NetworkingTabContent/NetworkingTabContent';

const TAB_TITLES = [
  'Protocol',
  'Networking',
  'API',
  'Whitelisting',
  'Mining',
  'Resources',
  'Dangerous Zone',
];

const Tabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
      {activeTabIndex === 0 && <ProtocolTabContent />}
      {activeTabIndex === 1 && <NetworkingTabContent />}
      {activeTabIndex === 2 && <ProtocolTabContent />}
      {activeTabIndex === 3 && <ProtocolTabContent />}
      {activeTabIndex === 4 && <ProtocolTabContent />}
      {activeTabIndex === 5 && <ProtocolTabContent />}
      {activeTabIndex === 6 && <ProtocolTabContent />}
    </>
  );
};

export default Tabs;
