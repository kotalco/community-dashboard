import React from 'react'

import InputLabel from '@components/atoms/InputLabel/InputLabel'
import ExclamationCircleIcon from '@components/Icons/ExclamationCircleIcon/ExclamationCircleIcon'

interface Props {
  name: string
  placeholder?: string
  className?: string
  label?: string
  disabled?: boolean
  rounded?: string
  error?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      rounded,
      className = '',
      disabled = false,
      placeholder = '',
      onBlur,
      error,
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <InputLabel
            htmlFor={name}
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
          >
            {label}
          </InputLabel>
        )}
        <div className="relative max-w-xs">
          <input
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
            name={name}
            disabled={disabled}
            type="text"
            id={name}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 ${
              disabled ? 'bg-gray-200' : 'bg-transparent'
            } ${rounded ? rounded : 'rounded-md '}`}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default TextInput
