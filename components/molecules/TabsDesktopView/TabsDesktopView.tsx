import { Dispatch, SetStateAction } from 'react';

import Tab from '@components/atoms/Tab/Tab';

interface Props {
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  tabs: string[];
  activeTabIndex: number;
}

const Tabs: React.FC<Props> = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
  return (
    <div className="hidden sm:block">
      <div className="flex space-x-2" aria-label="Tabs">
        {tabs.map((title, i) => (
          <Tab
            key={i}
            active={i === activeTabIndex}
            danger={title === 'Dangerous Zone'}
            onClick={() => setActiveTabIndex(i)}
          >
            {title}
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
