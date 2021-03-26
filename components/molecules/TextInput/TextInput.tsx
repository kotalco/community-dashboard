import React from 'react'

import InputLabel from '@components/atoms/InputLabel/InputLabel'
import ExclamationCircleIcon from '@components/Icons/ExclamationCircleIcon/ExclamationCircleIcon'

interface Props {
  name: string
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  error?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
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
            className={`block text-sm font-medium text-gray-700 ${className}`}
          >
            {label}
          </InputLabel>
        )}
        <div className="mt-1 relative w-96">
          <input
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
            name={name}
            disabled={disabled}
            type="text"
            id={name}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
