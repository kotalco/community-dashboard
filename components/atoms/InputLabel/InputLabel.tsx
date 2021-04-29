interface Props {
  htmlFor: string
  children: string
  labelClassName?: string
}

const InputLabel: React.FC<Props> = ({ children, htmlFor, labelClassName }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
    >
      {children}
    </label>
  )
}

export default InputLabel
