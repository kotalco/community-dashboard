interface Props {
  htmlFor: string
  children: string
}

const InputLabel: React.FC<Props> = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1`}
    >
      {children}
    </label>
  )
}

export default InputLabel
