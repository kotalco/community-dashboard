import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';

interface Props<T> {
  option: T;
  label: keyof T;
}

function ListboxOption<T>({ option, label }: Props<T>) {
  return (
    <Listbox.Option
      value={option}
      className={({ active }) =>
        `${
          active ? 'text-white bg-indigo-600' : 'text-gray-900'
        } cursor-default select-none relative py-2 pl-3 pr-9`
      }
    >
      {({ selected, active }) => (
        <>
          <span
            className={`${
              selected ? 'font-semibold' : 'font-normal'
            } block truncate`}
          >
            {option[label]}
          </span>
          {selected ? (
            <span
              className={`${
                active ? 'text-white' : 'text-indigo-600'
              } absolute inset-y-0 right-0 flex items-center pr-4`}
            >
              <CheckIcon aria-hidden="true" className="h-5 w-5" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
}

export default ListboxOption;
