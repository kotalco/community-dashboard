import { useState } from 'react';

import TabsMobileView from '@components/molecules/TabsMobileView/TabsMobileView';
import TabsDesktopView from '@components/molecules/TabsDesktopView/TabsDesktopView';

const TAB_TITLES = [
  'Protocol',
  'Networking',
  'API',
  'Whitelisting',
  'Mining',
  'Resources',
  'Dangerous Zone',
];

const TabsHeader = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
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
  );
};

export default TabsHeader;
