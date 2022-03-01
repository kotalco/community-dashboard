import React, { ReactNode } from 'react';
import { SelectOption } from '@interfaces/SelectOption';
import { ChangeHandler } from 'react-hook-form';

import CheckBox from '@components/molecules/CheckBox/CheckBox';

interface Props {
  options: SelectOption[];
  name: string;
  label: string;
  disabled?: boolean;
  error?: string | ReactNode;
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ name, label, onBlur, onChange, disabled, options, error }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <p className="block text-sm text-gray-900 font-md">{label}</p>
        <div className="flex flex-wrap items-center justify-start ml-5">
          {options.map(({ label, value }) => (
            <CheckBox
              key={value}
              label={label}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              disabled={disabled}
              value={value}
              ref={ref}
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Checkbox;
