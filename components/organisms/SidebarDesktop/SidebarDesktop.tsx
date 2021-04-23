import Logo from '@components/atoms/Logo/Logo'
import NavLinks from '@components/molecules/NavLinks/NavLinks'

const SidebarDesktop: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Logo />
          </div>
          <NavLinks className="mt-5 flex-1 flex flex-col divide-y divide-white-800 overflow-y-auto" />
        </div>
      </div>
    </div>
  )
}

export default SidebarDesktop
