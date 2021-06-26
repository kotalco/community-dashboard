import { useState, forwardRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'

interface Props {
  options: string[]
  error?: string
  name: string
  label: string
  value: any[]
  placeholder: string
  onChange: (e: any[]) => void
}

const Multiselect = forwardRef<HTMLDivElement, Props>(
  ({ options, label, value, onChange, placeholder, error }, _ref) => {
    const [text, setText] = useState(value.join(', '))

    const isSelected = (option: string) => {
      return !!value.find((el) => el === option)
    }

    const handleChange = (text: string) => {
      if (!isSelected(text)) {
        const newValue = [...value, text]
        onChange(newValue)
        setText(newValue.join(', '))
      } else {
        const newValue = value.filter((el) => el !== text)
        onChange(newValue)
        setText(newValue.join(', '))
      }
    }

    return (
      <>
        <Listbox
          as="div"
          className="space-y-1 max-w-xs mt-4"
          value={text}
          onChange={handleChange}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full rounded-md">
                  <Listbox.Button
                    className={`sm:text-small text-base cursor-default relative w-full border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 ${
                      open ? 'rounded-t-md' : 'rounded-md'
                    }`}
                  >
                    <span className="block truncate text-sm">
                      {text || placeholder}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute z-10 w-full rounded-b-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-b-md py-1 text-base leading-6 shadow-sm overflow-auto focus:outline-none focus:ring-indigo-500 sm:text-small sm:leading-5"
                  >
                    {options.map((option, i) => {
                      const selected = isSelected(option)
                      return (
                        <Listbox.Option key={i} value={option}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? 'text-white bg-indigo-600'
                                  : 'text-gray-900'
                              } cursor-default select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                {option}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-indigo-600'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      )
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </>
    )
  }
)
export default Multiselect
