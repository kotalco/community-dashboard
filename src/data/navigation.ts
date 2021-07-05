import { HomeIcon, CubeIcon, KeyIcon } from '@heroicons/react/outline'

export const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  {
    name: 'Deployments',
    icon: CubeIcon,
    children: [
      {
        name: 'Ethereum',
        href: '/deployments/ethereum/nodes',
        protocol: 'ethereum',
      },
      {
        name: 'Ethereum 2.0',
        href: '/deployments/ethereum2/beaconnodes',
        protocol: 'ethereum2',
      },
      { name: 'IPFS', href: '/deployments/ipfs/peers', protocol: 'ipfs' },
    ],
  },
  { name: 'Secrets', icon: KeyIcon, href: '/core/secrets' },
]
