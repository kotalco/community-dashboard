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
              className="block px-4 py-3 mx-2 my-3 font-bold text-center text-white bg-red-600 rounded hover:bg-red-700"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
