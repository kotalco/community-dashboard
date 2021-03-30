import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon'

interface Props {
  onClick: () => void
  alert?: boolean
  disabled?: boolean
  loading?: boolean
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  alert,
  disabled,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        alert
          ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-600 focus:ring-red-500'
          : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 focus:ring-indigo-500'
      }`}
    >
      <SpinnerIcon />
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  loading: false,
}

export default Button
