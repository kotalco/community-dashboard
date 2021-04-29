interface Props {
  title: string
  date: string
}

const PageDetailsHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <span className="text-xs text-gray-500">Last Updated on {date}</span>
    </div>
  )
}

export default PageDetailsHeader
