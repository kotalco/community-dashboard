import InputLabel from '@components/atoms/InputLabel/InputLabel'

interface Props {
  id?: string
  name: string
  label: string
}

const TextInput: React.FC<Props> = ({ id, name, label }) => {
  return (
    <div>
      <InputLabel
        htmlFor="node_name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </InputLabel>
      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={id}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  )
}

export default TextInput
