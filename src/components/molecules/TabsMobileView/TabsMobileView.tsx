import { Dispatch, SetStateAction } from 'react';

interface Props {
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  tabs: string[];
  activeTabIndex: number;
}

const TabsMobileView: React.FC<Props> = ({
  setActiveTabIndex,
  tabs,
  activeTabIndex,
}) => {
  return (
    <div className="sm:hidden">
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        value={activeTabIndex}
        onChange={(e) => setActiveTabIndex(+e.target.value)}
        name="tabs"
        id="tabs"
        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        {tabs.map((title, i) => (
          <option key={i} value={i}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TabsMobileView;
