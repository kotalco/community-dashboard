import React, { useState, useEffect } from 'react'

interface Props {
  name: string
  label: string
  value: string[]
  multiple?: boolean
  helperText?: string
  error?: string
  onChange: (value: string[]) => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ value, name, label, error, helperText, onChange, multiple }, _ref) => {
    const [text, setText] = useState(value.join('\n'))

    useEffect(() => {
      onChange([])
      setText('')
    }, [multiple])

    const handleChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const { value } = e.target
      setText(value)

      // Convert value to empty array if empty string and return
      if (!value) {
        onChange([])
        return
      }

      if (multiple) {
        onChange(value.split('\n'))
      } else {
        onChange([value])
      }
    }

    return (
      <div className="sm:col-span-6">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1 max-w-xs">
          {multiple ? (
            <textarea
              onChange={handleChange}
              id={name}
              name={name}
              value={text}
              rows={5}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          ) : (
            <input
              onChange={handleChange}
              id={name}
              name={name}
              value={text}
              type="text"
              className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
            />
          )}
        </div>
        {helperText && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    )
  }
)

export default Textarea
