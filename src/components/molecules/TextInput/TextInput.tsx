import React, { InputHTMLAttributes, MouseEvent, useState } from 'react';
import {
  Control,
  FieldValues,
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

interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
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
}

function TextInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  rules,
  defaultValue,
  ...props
}: Props<T>) {
  const [inputType, setInputType] = useState(props.type);
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
      {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
      <fieldset disabled={props.disabled} className="relative max-w-xs">
        <input
          type={props.type || 'text'}
          id={props.id}
          className={`shadow-sm focus:ring-indigo-500 block w-full sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 rounded-md ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          {...props}
          {...field}
        />
        {error && props.type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {props.type === 'password' && (
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
