import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { ExclamationCircleIcon, SelectorIcon } from '@heroicons/react/solid';

import ListboxOption from '@components/molecules/SelectNew/ListboxOption';

type Props<T> = {
  options: T[];
  labelProp: keyof T;
  valueProp: keyof T;
  defaultValue?: T;
  onChange: (value: string | undefined) => void;
  error?: string;
  label: string;
  placeholder: string;
  helperText?: string;
} & (
  | { href: string; hrefTitle: string }
  | { href?: never; hrefTitle?: never }
) &
  ({ other: true; otherLabel: string } | { other?: never; otherLabel?: never });

function Select<T extends { [key: string]: string }>({
  error,
  onChange,
  label,
  options,
  placeholder,
  href,
  hrefTitle,
  defaultValue,
  other,
  otherLabel,
  helperText,
  labelProp,
  valueProp,
}: Props<T>) {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (option: T) => {
    setSelected(option);
    if (option[valueProp] === 'other') {
      return onChange(undefined);
    }
    onChange(option[valueProp]);
  };

  return (
    <div className="max-w-xs mb-4">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <div className="w-full">
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="mt-1 relative">
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
                  {selected?.[labelProp] || placeholder}
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
                  {options.map((option) => (
                    <ListboxOption
                      key={option[valueProp]}
                      option={option}
                      label={labelProp}
                    />
                  ))}
                  {other && (
                    <ListboxOption
                      option={{ label: otherLabel, [valueProp]: 'other' }}
                      label="label"
                    />
                  )}
                  {href && hrefTitle && (
                    <Link href={href}>
                      <a className="pl-3 py-1 text-sm text-indigo-600 hover:underline">
                        {hrefTitle}
                      </a>
                    </Link>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
      {selected?.[valueProp] === 'other' && (
        <div>
          <input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-t-0 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
      )}
      {helperText && <p className="mt-1 text-sm text-gray-600">{helperText}</p>}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
