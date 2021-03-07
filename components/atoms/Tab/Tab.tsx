interface Props {
  active: boolean
  danger?: boolean
  onClick: () => void
}

const Tab: React.FC<Props> = ({ active, danger, onClick, children }) => {
  if (danger) {
    return (
      <span
        onClick={onClick}
        className={`${
          active ? 'bg-red-100 text-red-700' : 'text-red-500 hover:text-red-700'
        } px-3 py-2 font-medium text-sm rounded-md cursor-pointer`}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      onClick={onClick}
      className={`${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-500 hover:text-gray-700'
      } px-3 py-2 font-medium text-sm rounded-md cursor-pointer`}
    >
      {children}
    </span>
  )
}

export default Tab
