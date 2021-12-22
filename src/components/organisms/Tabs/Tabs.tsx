import React, { PropsWithChildren, ReactElement } from 'react';
import { KeyedMutator } from 'swr';
import { Tab } from '@headlessui/react';

interface Props<T> {
  tabs: string[];
  mutate?: KeyedMutator<T>;
}

function Tabs<T>({ tabs, children, mutate }: PropsWithChildren<Props<T>>) {
  const tabPanelArray = React.Children.toArray(children);
  return (
    <Tab.Group>
      <Tab.List className="flex p-2 overflow-x-auto border-b border-gray-200 sm:px-4 sm:py-5">
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
        {React.Children.map(tabPanelArray, (el) => {
          const child = el as ReactElement;
          const elemnet = React.cloneElement(child, { mutate });
          return (
            <Tab.Panel className="focus:outline-none">{elemnet}</Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;
