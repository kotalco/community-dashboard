import { useState } from 'react'

import SidebarMobile from '@components/organisms/SidebarMobile/SidebarMobile'
import SidebarDesktop from '@components/organisms/SidebarDesktop/SidebarDesktop'
import Navbar from '@components/organisms/Navbar/Navbar'

const Layout: React.FC = ({ children }) => {
  // State for sidebar menu in mobile view
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      <SidebarDesktop />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar setIsOpen={setIsOpen} />

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          <div className="max-w-7xl mx-auto sm:px-6 md:px-8 px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
