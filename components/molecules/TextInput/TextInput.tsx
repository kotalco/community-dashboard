import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

import InputLabel from '@components/atoms/InputLabel/InputLabel'

interface Props {
  name: string
  placeholder?: string
  className?: string
  helperText?: string
  label?: string
  error?: string
  disabled?: boolean
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      className,
      placeholder,
      onBlur,
      onChange,
      error,
      disabled,
      helperText,
    },
    ref
  ) => {
    return (
      <div>
        {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
        <fieldset disabled={disabled} className="relative max-w-xs">
          <input
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
            name={name}
            type="text"
            id={name}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </fieldset>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {helperText && <p className="mt-2 text-sm">{helperText}</p>}
      </div>
    )
  }
)

TextInput.defaultProps = {
  className: '',
  placeholder: '',
}

export default TextInput
