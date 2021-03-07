interface Props {
  title: string
  content: string
}

const Stats: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{content}</dd>
      </div>
    </div>
  )
}

export default Stats
