import React from 'react';

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
  value?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(function Checkbox(
  { name, label, onBlur, onChange, value, disabled },
  ref
) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          value={value}
          ref={ref}
          onBlur={onBlur}
          onChange={onChange}
          id={value}
          name={name}
          type="checkbox"
          disabled={disabled}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:bg-gray-100 disabled:checked:bg-gray-300"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={value} className="font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
  );
});

export default Checkbox;
