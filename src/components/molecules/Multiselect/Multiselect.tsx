import Link from 'next/link';
import { useState, Fragment, useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { SelectOption } from '@interfaces/SelectOption';

type Props = {
  options?: SelectOption[];
  label: string;
  value?: string[];
  placeholder: string;
  onChange: (e: string[] | undefined) => void;
} & (
  | { errors?: never; error?: never }
  | { error: string | undefined; errors: FieldErrors }
) &
  ({ href: string; hrefTitle: string } | { href?: never; hrefTitle?: never });

const Multiselect: React.FC<React.PropsWithChildren<Props>> = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  errors,
  error,
  href,
  hrefTitle,
}) => {
  const defaultValue = options?.filter((option) =>
    value?.includes(option.value)
  );
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(options?.filter((option) => value?.includes(option.value)));
  }, [options, value]);

  const handleChange = (values: SelectOption[]) => {
    setSelected(values);
    onChange(values.map(({ value }) => value));
  };

  return (
    <div className="mb-4">
      <Listbox
        as="div"
        className="max-w-xs"
        value={selected}
        onChange={handleChange}
        multiple
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button
                className={`bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <span
                  className={`block truncate ${
                    !selected?.length ? 'text-gray-500' : ''
                  }`}
                >
                  {selected?.map(({ label }) => label).join(', ') ||
                    placeholder}
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
                  className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-small"
                >
                  {options?.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        `${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-3 pr-9 text-sm`
                      }
                    >
                      {({ active, selected }) => (
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
                  {href && hrefTitle && (
                    <Link href={href}>
                      <a className="py-1 pl-3 text-sm text-indigo-600 hover:underline">
                        {hrefTitle}
                      </a>
                    </Link>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {error && (
        <ErrorMessage
          errors={errors}
          name={error}
          as={<p className="mt-2 text-sm text-red-600" />}
        />
      )}
    </div>
  );
};
export default Multiselect;
