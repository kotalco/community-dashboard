import { SVGProps } from 'react';
import { HomeIcon, CubeIcon, KeyIcon } from '@heroicons/react/outline';

interface URL {
  type: 'link';
  href: string;
}

interface Button {
  type: 'button';
  children: { name: string; href: string; protocol: string }[];
}

type Navigation = {
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
} & (URL | Button);

export const navigation: Navigation[] = [
  { type: 'link', name: 'Dashboard', icon: HomeIcon, href: '/' },
  {
    type: 'button',
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
      {
        name: 'Filecoin',
        href: '/deployments/filecoin/nodes',
        protocol: 'filecoin',
      },
      { name: 'IPFS', href: '/deployments/ipfs/peers', protocol: 'ipfs' },
      {
        name: 'Chainlink',
        href: '/deployments/chainlink/nodes',
        protocol: 'chainlink',
      },
      {
        name: 'Polkadot',
        href: '/deployments/polkadot/nodes',
        protocol: 'polkadot',
      },
    ],
  },
  { type: 'link', name: 'Secrets', icon: KeyIcon, href: '/core/secrets' },
];
