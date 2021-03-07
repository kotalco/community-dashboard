interface Props {
  nodeName: string
  date: string
}

const PageDetailsHeader: React.FC<Props> = ({ nodeName, date }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold">{nodeName}</h1>
      <span className="text-xs text-gray-500">Last Updated on {date}</span>
    </div>
  )
}

export default PageDetailsHeader
