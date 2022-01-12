import React, { useState, useEffect } from 'react';
import InputLabel from '@components/atoms/InputLabel/InputLabel';
import { SelectOption } from '@interfaces/SelectOption';

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  unit: string | SelectOption[];
  onChange: (value: string) => void;
}

const UnitTextInput = React.forwardRef<HTMLInputElement, Props>(
  function UnitTextInpit({ value, label, name, unit, onChange, error }, ref) {
    const [amount, setAmount] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');

    useEffect(() => {
      const valueArray = value.match(/(\d+|[^\d]+)/g);
      if (valueArray && valueArray.length === 2) {
        setAmount(valueArray[0]);
        setSelectedUnit(valueArray[1]);
      }
    }, [value]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAmount(value);
      if (value) {
        onChange(value + selectedUnit);
      } else {
        onChange(value);
      }
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setSelectedUnit(value);
      onChange(amount + value);
    };

    return (
      <div>
        <div>
          <InputLabel
            htmlFor={name}
            labelClassName="block text-sm font-medium text-gray-700"
          >
            {label}
          </InputLabel>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={amount || value}
              ref={ref}
              onChange={handleAmountChange}
              type="text"
              name={name}
              id={name}
              aria-describedby={name}
            />

            {typeof unit === 'string' ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{unit}</span>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select
                  value={selectedUnit}
                  onChange={handleUnitChange}
                  className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm"
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
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default UnitTextInput;
