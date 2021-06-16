import React, { useState } from 'react'

interface Props {
  name: string
  label: string
  value: string[]
  helperText?: string
  error?: string
  onChange: (value: string[]) => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ value, name, label, error, helperText, onChange }, _ref) => {
    const [text, setText] = useState(value.join('\n'))

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value

      setText(value)
      onChange(value.split('\n'))
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
          <textarea
            onChange={handleChange}
            id={name}
            name={name}
            value={text}
            rows={5}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          ></textarea>
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
