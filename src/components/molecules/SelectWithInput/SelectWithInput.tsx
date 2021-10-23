import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  ExclamationCircleIcon,
  CheckIcon,
  SelectorIcon,
} from '@heroicons/react/solid';

import { SelectOption } from '@interfaces/SelectOption';

interface Props {
  options: SelectOption[];
  placeholder: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  label: string;
  className?: string;
  error?: string;
}

const SelectWithInput: React.FC<Props> = ({
  name,
  error,
  onChange,
  value,
  label,
  options,
  placeholder,
}) => {
  const allOptions = [
    { label: placeholder, value: '' },
    ...options,
    { label: 'Other', value: 'other' },
  ];
  const [selected, setSelected] = useState<SelectOption>(allOptions[0]);

  const handleChange = (option: SelectOption) => {
    if (option.value !== 'other') {
      setSelected(option);
      onChange(option.value);
    } else {
      setSelected(option);
      onChange('');
    }
  };

  return (
    <div className="max-w-xs mb-4">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button
                className={`bg-white relative w-full border shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  error ? 'border-red-300' : 'border-gray-300 '
                } ${
                  selected.value === 'other' ? 'rounded-t-md' : 'rounded-md'
                }`}
              >
                <span
                  className={`block truncate ${
                    !selected.value ? 'text-gray-500' : ''
                  }`}
                >
                  {selected.label}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
                {error && (
                  <div className="absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {allOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        `${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } ${
                          !option.value ? 'hidden' : ''
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
                            {option.label}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-white' : 'text-indigo-600'
                              } absolute inset-y-0 right-0 flex items-center pr-4`}
                            >
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {selected.value === 'other' && (
        <div>
          <label htmlFor={name} className="sr-only">
            {label}
          </label>
          <input
            type="text"
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectWithInput;
