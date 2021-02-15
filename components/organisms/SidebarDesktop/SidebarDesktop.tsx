import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';

const SidebarDesktop: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
          <Logo />
          <div className="mt-5 flex-grow flex flex-col">
            <NavLinks textSize="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
