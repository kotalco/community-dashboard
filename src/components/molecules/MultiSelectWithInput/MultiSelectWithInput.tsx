import { FieldErrors } from 'react-hook-form';
import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { SelectOption } from '@interfaces/SelectOption';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  options: SelectOption[];
  label: string;
  value?: string[];
  placeholder: string;
  otherLabel: string;
  emptyLabel?: string;
  helperText?: string;
  onChange: (e: string[] | undefined) => void;
  single?: boolean;
} & (
  | { href: string; hrefTitle: string }
  | { href?: never; hrefTitle?: never }
) &
  (
    | { errors?: never; error?: never }
    | { error: string | undefined; errors: FieldErrors }
  );

const Multiselect: React.FC<React.PropsWithChildren<Props>> = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  error,
  errors,
  href,
  hrefTitle,
  otherLabel,
  helperText,
  single,
  emptyLabel,
}) => {
  const defaultValue =
    options?.filter((option) => value?.includes(option.value)) || [];
  const [textAreaValues, setTextareaValues] = useState<string[]>(
    value?.filter(
      (option) => !options.map(({ value }) => value).includes(option)
    ) || []
  );

  const [other, setOther] = useState(!!textAreaValues.length);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(
      options?.filter((option) => value?.includes(option.value)) || []
    );
  }, [options, value]);

  const handleChange = (values: SelectOption[]) => {
    setSelected(values);
    onChange([...values.map(({ value }) => value), ...textAreaValues]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newTextareaValues = e.target.value.split('\n');
    setTextareaValues(newTextareaValues);
    onChange([...selected.map(({ value }) => value), ...newTextareaValues]);
  };

  return (
    <div className="mb-4">
      <Listbox value={selected} onChange={handleChange} multiple>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="relative mt-1">
              <div className="flex">
                <Listbox.Button
                  className={`max-w-xs bg-white relative w-full border shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } ${!other ? 'rounded-md' : 'rounded-t-md'}`}
                >
                  <span
                    className={`block truncate ${
                      !selected.length ? 'text-gray-500' : ''
                    }`}
                  >
                    {selected.length
                      ? selected.map(({ label }) => label).join(', ')
                      : placeholder}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 w-full max-w-xs py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-small"
                >
                  {!options.length && (
                    <Listbox.Option
                      disabled
                      value={undefined}
                      className="py-2 pl-3 text-sm text-gray-500 pr-9"
                    >
                      {emptyLabel}
                    </Listbox.Option>
                  )}
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        `${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-3 pr-9 text-sm`
                      }
                    >
                      {({ active, selected }) => {
                        return (
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
                        );
                      }}
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
      {otherLabel && !other && (
        <button
          type="button"
          className="mt-1 text-sm text-indigo-600"
          onClick={() => setOther(true)}
        >
          {otherLabel}
        </button>
      )}
      {other && !single && (
        <div className="max-w-xs">
          <textarea
            rows={5}
            defaultValue={textAreaValues.join('\n')}
            onChange={handleInputChange}
            className={`focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-t-0 resize-none ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
      )}
      {other && single && (
        <div className="max-w-xs">
          <input
            type="text"
            defaultValue={textAreaValues.join('\n')}
            onChange={handleInputChange}
            className={`focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-t-0 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
      )}
      {helperText && other && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
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
