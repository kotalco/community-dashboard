import { Fragment, useState } from 'react';
import Link from 'next/link';
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
  onChange: (value: string) => void;
  label: string;
  error?: string;
  href?: string;
  hrefTitle?: string;
  value?: string;
}

const Select: React.FC<Props> = ({
  error,
  onChange,
  label,
  options,
  placeholder,
  href,
  hrefTitle,
  value,
}) => {
  const allOptions = [{ label: placeholder, value: '' }, ...options];
  const defaultValue =
    allOptions.find((option) => option.value === value) || allOptions[0];
  const [selected, setSelected] = useState<SelectOption>(defaultValue);

  const handleChange = (option: SelectOption) => {
    setSelected(option);
    onChange(option.value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button
              className={`bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                error ? 'border-red-300' : 'border-gray-300 '
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
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                {href && hrefTitle && (
                  <Link href={href}>
                    <a className="pl-3 text-sm text-indigo-600 hover:underline">
                      {hrefTitle}
                    </a>
                  </Link>
                )}
              </Listbox.Options>
            </Transition>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </>
      )}
    </Listbox>
  );
};

export default Select;
