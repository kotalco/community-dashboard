import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';

const SidebarDesktop: React.FC = () => {
  return (
    <div className="hidden md:flex md:shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col pt-5 pb-4 overflow-y-auto bg-white grow">
          <div className="flex items-center shrink-0 px-4">
            <Logo />
          </div>
          <NavLinks className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-white-800" />
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
