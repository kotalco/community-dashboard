import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

import InputLabel from '@components/atoms/InputLabel/InputLabel'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  options: SelectOption[] | string[]
  name: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
  label: string
  className?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ options, name, label, className, error, onChange, onBlur }, ref) => {
    return (
      <>
        <div className="mt-4 max-w-xs">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <div className="relative">
            <select
              id={name}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            >
              {options.map((option: SelectOption | string) =>
                typeof option === 'string' ? (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ) : (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
              {/* {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))} */}
            </select>
            {error && (
              <div className="absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </>
    )
  }
)

export default Select
