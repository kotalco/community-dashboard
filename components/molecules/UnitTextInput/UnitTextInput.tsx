import React from 'react'
import InputLabel from '@components/atoms/InputLabel/InputLabel'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  label: string
  name: string
  unit: string | SelectOption[]
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UnitTextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, unit, onBlur, onChange }, ref) => {
    return (
      <div className="w-48 mt-4">
        <div>
          <div>
            <InputLabel
              htmlFor={name}
              labelClassName="block text-sm font-medium text-gray-700"
            >
              {label}
            </InputLabel>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                ref={ref}
                onBlur={onBlur}
                onChange={onChange}
                type="text"
                name={name}
                id={name}
                aria-describedby={name}
              />

              {typeof unit === 'string' ? (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{unit}</span>
                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    {unit.map(({ label, value }) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default UnitTextInput
