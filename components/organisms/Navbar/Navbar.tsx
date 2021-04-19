import BellIcon from '@components/Icons/BellIcon/BellIcon'
import IconButton from '@components/atoms/IconButton/IconButton'
import SearchForm from '@components/molecules/SearchForm/SearchForm'
import MenuIcon from '@components/Icons/MenuIcon/MenuIcon'

interface Props {
  toggleSidebar: () => void
}

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked')
  }

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <IconButton
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        srText="Open sidebar"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <SearchForm />
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <IconButton
            srText="View notification"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClick}
          >
            <BellIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Navbar
