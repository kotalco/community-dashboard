import React from 'react'

import InputLabel from '@components/atoms/InputLabel/InputLabel'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  options: SelectOption[]
  name: string
  label: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ options, name, label, onChange, defaultValue }, ref) => {
    return (
      <div className="mt-4">
        <InputLabel
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </InputLabel>
        <select
          defaultValue={defaultValue}
          id={name}
          name={name}
          ref={ref}
          onChange={onChange}
          className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Select
