import {
  HomeIcon,
  CubeIcon,
  CursorClickIcon,
  KeyIcon,
  DocumentTextIcon,
  BookOpenIcon,
} from '@heroicons/react/outline'

export const navigation = [
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
