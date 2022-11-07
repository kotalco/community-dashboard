import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';

const SidebarDesktop: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="hidden md:flex md:shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col pt-5 overflow-y-auto bg-white grow">
          <div className="flex items-center px-4 shrink-0">
            <Logo />
          </div>
          <NavLinks className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-white-800" />

          <div className="shadow-2xl">
            <a
              href="https://www.kotal.co"
              className="font-nunito block px-4 py-3 mx-2 my-3 mb-1 font-bold text-center text-white bg-red-600 rounded hover:bg-red-700"
            >
              Upgrade to Kotal Pro
            </a>
            <ul className="pb-4 font-light text-sm text-center text-gray-500">
              <li className="font-bold font-nunito m-2 text-black">
                Get 1 month for free
              </li>
              <li>Secure API endpoints</li>
              <li>Team management</li>
              <li>Workspace management</li>
              <li>Role-based Access Control</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
