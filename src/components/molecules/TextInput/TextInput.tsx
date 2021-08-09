import React, { MouseEvent, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';

import InputLabel from '@components/atoms/InputLabel/InputLabel';
import IconButton from '@components/atoms/IconButton/IconButton';

interface Props {
  name: string;
  placeholder?: string;
  helperText?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  type?: string;
  onChange: ChangeHandler;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(function TextInput(
  {
    label,
    name,
    placeholder = '',
    onChange,
    error,
    disabled,
    helperText,
    type = 'text',
  },
  ref
) {
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
    <div>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <fieldset disabled={disabled} className="relative max-w-xs">
        <input
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          name={name}
          type={inputType}
          id={name}
          className={`shadow-sm focus:ring-indigo-500 block w-full sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 rounded-md ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
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
});

export default TextInput;
