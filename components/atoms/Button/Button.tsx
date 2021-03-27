interface Props {
  onClick: () => void
  alert?: boolean
}

const Button: React.FC<Props> = ({ children, onClick, alert }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        alert
          ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
          : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
      }`}
    >
      {children}
    </button>
  )
}

export default Button
