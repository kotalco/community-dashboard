import React from 'react';
import { Tab } from '@headlessui/react';

interface Props {
  tabs: string[];
}

const Tabs: React.FC<Props> = ({ tabs, children }) => {
  const tabPanelArray = React.Children.toArray(children);
  return (
    <Tab.Group>
      <Tab.List className="flex p-2 sm:px-4 sm:py-5 border-b border-gray-200 overflow-x-auto">
        {tabs.map((title) =>
          title.includes('Danger') ? (
            <Tab
              key={title}
              className={({ selected }) =>
                `${
                  selected
                    ? 'bg-red-100 text-red-700'
                    : 'text-red-500 hover:text-red-700'
                } p-1 sm:px-3 sm:py-2 font-medium text-sm rounded-md cursor-pointer whitespace-nowrap`
              }
            >
              {title}
            </Tab>
          ) : (
            <Tab
              key={title}
              className={({ selected }) =>
                `${
                  selected
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md cursor-pointer`
              }
            >
              {title}
            </Tab>
          )
        )}
      </Tab.List>
      <Tab.Panels>
        {React.Children.map(tabPanelArray, (child) => (
          <Tab.Panel className="focus:outline-none">{child}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
