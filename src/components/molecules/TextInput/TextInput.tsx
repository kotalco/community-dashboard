import React, { MouseEvent, useState } from 'react';
import {
  Control,
  useController,
  RegisterOptions,
  FieldPath,
  UnpackNestedValue,
  PathValue,
  Path,
} from 'react-hook-form';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';

import InputLabel from '@components/atoms/InputLabel/InputLabel';
import IconButton from '@components/atoms/IconButton/IconButton';

interface Props<T> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  helperText?: string;
  label?: string;
  error?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
}

function TextInput<T>({
  name,
  control,
  label,
  error,
  helperText,
  rules,
  type = 'text',
  defaultValue,
  id,
  placeholder,
  disabled,
}: Props<T>) {
  const [inputType, setInputType] = useState(type);
  const { field } = useController<T>({
    name,
    control,
    rules,
    defaultValue,
  });

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
          type={inputType}
          id={id}
          className={`shadow-sm focus:ring-indigo-500 block w-full sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 rounded-md ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          {...field}
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

export default TextInput;
