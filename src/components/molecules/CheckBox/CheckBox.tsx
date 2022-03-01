import React, { ReactNode } from 'react';

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
  value?: string;
  error?: string | ReactNode;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ name, label, onBlur, onChange, disabled, value, error }, ref) => {
    return (
      <>
        <div className="flex items-center w-1/2 h-5 mb-1 space-x-2 sm:w-1/3">
          <input
            value={value}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            id={value}
            name={name}
            type="checkbox"
            disabled={disabled}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:bg-gray-100 disabled:checked:bg-gray-300"
          />

          <label htmlFor={value} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </>
    );
  }
);

export default Checkbox;
