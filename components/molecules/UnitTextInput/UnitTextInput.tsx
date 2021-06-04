import React, { useState, useEffect } from 'react'
import InputLabel from '@components/atoms/InputLabel/InputLabel'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  label: string
  name: string
  value: string
  unit: string | SelectOption[]
  onChange: (value: string) => void
}

const UnitTextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ value, label, name, unit, onChange }, ref) => {
    const [amount, setAmount] = useState('')
    const [selectedUnit, setSelectedUnit] = useState('')

    useEffect(() => {
      const valueArray = value.match(/(\d+|[^\d]+)/g)
      if (valueArray && valueArray.length === 2) {
        setAmount(valueArray[0])
        setSelectedUnit(valueArray[1])
      }
    }, [])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setAmount(value)
      if (value) {
        onChange(value + selectedUnit)
      } else {
        onChange(value)
      }
    }

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target
      setSelectedUnit(value)
      onChange(amount + value)
    }

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
                value={amount || value}
                ref={ref}
                onChange={handleAmountChange}
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
                  <select
                    value={selectedUnit}
                    onChange={handleUnitChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
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
