import { useState } from 'react';

import SidebarMobile from '@components/organisms/SidebarMobile.tsx/SidebarMobile';
import SidebarDesktop from '@components/organisms/SidebarDesktop/SidebarDesktop';
import Navbar from '@components/organisms/Navbar/Navbar';

const Layout: React.FC = ({ children }) => {
  // State for sidebar menu in mobile view
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SidebarMobile isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <SidebarDesktop />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
