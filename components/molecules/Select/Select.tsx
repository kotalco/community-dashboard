import React from 'react'

import InputLabel from '@components/atoms/InputLabel/InputLabel'
import ExclamationCircleIcon from '@components/Icons/ExclamationCircleIcon/ExclamationCircleIcon'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  options: SelectOption[]
  name: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
  label: string
  rounded?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ options, name, label, rounded, error, onChange, onBlur }, ref) => {
    return (
      <>
        <div className="mt-4 max-w-xs">
          <InputLabel
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </InputLabel>
          <div className="relative">
            <select
              id={name}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                rounded ? rounded : 'rounded-md '
              }`}
            >
              {options.map(({ value, label }, i) => (
                <option key={i} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {error && (
              <div className="absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon />
              </div>
            )}
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        )}
      </>
    )
  }
)

export default Select
