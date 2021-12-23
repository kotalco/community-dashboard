import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { SelectOption } from '@interfaces/SelectOption';

interface Props {
  options: SelectOption[];
  placeholder: string;
  name: string;
  onChange: (value: string) => void;
  value?: string;
  label: string;
  className?: string;
  error?: string;
  otherLabel?: string;
  helperText?: string;
}

const SelectWithInput: React.FC<Props> = ({
  name,
  error,
  onChange,
  value,
  label,
  options,
  placeholder,
  otherLabel = 'Other',
  helperText,
}) => {
  const allOptions = [...options, { label: otherLabel, value: 'other' }];
  const [selected, setSelected] = useState(
    value
      ? options.find((option) => option.value === value) || {
          label: otherLabel,
          value: 'other',
        }
      : undefined
  );

  const handleChange = (option: SelectOption) => {
    setSelected(option);
    if (option.value !== 'other') {
      onChange(option.value);
    } else {
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
            <div className="relative mt-1">
              <Listbox.Button
                className={`bg-white relative w-full border shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  error ? 'border-red-300' : 'border-gray-300 '
                } ${
                  selected?.value === 'other' ? 'rounded-t-md' : 'rounded-md'
                }`}
              >
                <span
                  className={`block truncate ${
                    !selected ? 'text-gray-500' : ''
                  }`}
                >
                  {selected?.label || placeholder}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
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
                  className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {allOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        `${
                          active
                            ? 'text-white bg-indigo-600'
                            : option.value === 'other'
                            ? 'text-indigo-600'
                            : 'text-gray-900'
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
                                className="w-5 h-5"
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
      {selected?.value === 'other' && (
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
            className={`focus:ring-indigo-500 focus:border-indigo-500 relative block w-full border-t-0 rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
      )}
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectWithInput;
