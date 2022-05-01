import React, { MouseEvent, useId, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ChangeHandler } from 'react-hook-form';

import InputLabel from '@components/atoms/InputLabel/InputLabel';
import IconButton from '@components/atoms/IconButton/IconButton';

interface Props {
  onChange: ChangeHandler;
  onBlur?: ChangeHandler;
  defaultValue?: string | number;
  name: string;
  helperText?: string;
  label?: string;
  error?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  unit?: string;
  fullWidth?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      error,
      helperText,
      type = 'text',
      placeholder,
      disabled,
      defaultValue,
      unit,
      fullWidth,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    const id = useId();

    const togglePassword = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (inputType === 'password') {
        setInputType('text');
      } else {
        setInputType('password');
      }
    };

    return (
      <div className="mb-4">
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <fieldset
          disabled={disabled}
          className={`relative ${fullWidth ? 'w-full' : 'max-w-xs'}`}
        >
          <input
            ref={ref}
            type={inputType}
            id={id}
            className={`appearance-none shadow-sm focus:ring-indigo-500 block w-full sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 rounded-md ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            defaultValue={defaultValue}
          />
          {unit && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{unit}</span>
            </div>
          )}

          {type === 'password' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconButton onClick={togglePassword}>
                {inputType === 'password' ? (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeOffIcon className="w-5 h-5 text-gray-400" />
                )}
              </IconButton>
            </div>
          )}
        </fieldset>
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && <p className="mt-2 text-sm">{helperText}</p>}
      </div>
    );
  }
);

export default TextInput;
