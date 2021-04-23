import {
  HomeIcon,
  CubeIcon,
  CursorClickIcon,
  KeyIcon,
  DocumentTextIcon,
  BookOpenIcon,
} from '@heroicons/react/outline'

import NavLink from '@components/atoms/NavLink/NavLink'

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  {
    name: 'Deployments',
    icon: CubeIcon,
    children: [
      { name: 'Ethereum Nodes', href: '/deployments/ethereum/nodes' },
      { name: 'IPFS Peers', href: '/deployments/ipfs/peers' },
    ],
  },
  {
    name: 'Endpoints',
    icon: CursorClickIcon,
    href: '/endpoints',
  },
  { name: 'Keys', icon: KeyIcon, href: '/keys' },
  {
    name: 'Contracts',
    icon: DocumentTextIcon,
    href: '/contracts',
  },
  {
    name: 'Address Book',
    icon: BookOpenIcon,
    href: '/address-book',
  },
]

interface Props {
  className?: string
}

const NavLinks: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className} aria-label="Sidebar">
      <div className="px-2 space-y-1">
        {navigation.map(({ name, icon, href, children }) => (
          <NavLink key={name} Icon={icon} url={href} subLinks={children}>
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default NavLinks
