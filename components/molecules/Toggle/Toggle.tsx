interface Props {
  name: string
  label: string
  checked: boolean
  onClick: () => void
}

const Toggle: React.FC<Props> = ({ name, label, checked, onClick }) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <button
          onClick={onClick}
          id={name}
          type="button"
          aria-pressed={checked}
          className={`${
            checked ? 'bg-indigo-600' : 'bg-gray-200'
          } relative inline-flex flex-shrink h-6 w-11 border-2 border-trasnparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              checked ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          ></span>
        </button>
      </div>
    </>
  )
}

export default Toggle
