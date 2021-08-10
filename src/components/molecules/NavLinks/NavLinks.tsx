import NavLink from '@components/atoms/NavLink/NavLink';
import { navigation } from '@data/navigation';

interface Props {
  className?: string;
}

const NavLinks: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className} aria-label="Sidebar">
      <div className="px-2 space-y-1">
        {navigation.map(({ name, icon, ...rest }) =>
          rest.type === 'link' ? (
            <NavLink type={rest.type} key={name} Icon={icon} url={rest.href}>
              {name}
            </NavLink>
          ) : (
            <NavLink
              type={rest.type}
              key={name}
              Icon={icon}
              subLinks={rest.children}
            >
              {name}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default NavLinks;
