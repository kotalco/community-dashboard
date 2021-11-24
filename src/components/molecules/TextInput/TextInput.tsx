import React, { MouseEvent, useState } from 'react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';
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
      id,
      placeholder,
      disabled,
      defaultValue,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

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
        <fieldset disabled={disabled} className="relative max-w-xs">
          <input
            ref={ref}
            type={inputType}
            id={id}
            className={`shadow-sm focus:ring-indigo-500 block w-full sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 rounded-md ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            defaultValue={defaultValue}
          />
          {error && type !== 'password' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
          {type === 'password' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <IconButton onClick={togglePassword}>
                {inputType === 'password' ? (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
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
