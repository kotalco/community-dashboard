import { ChevronRightIcon } from '@heroicons/react/outline';
import { render, screen } from '@testing-library/react';
import NavLink from './NavLink';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

const subLinks = [
  {
    name: 'Home',
    href: '/',
    protocol: 'home',
  },
  {
    name: 'About',
    href: '/about',
    protocol: 'about',
  },
];

describe('navigation link with direct url', () => {
  it('render link', () => {
    render(
      <NavLink type="link" url="/" Icon={ChevronRightIcon}>
        Home
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('render active link', () => {
    render(
      <NavLink type="link" url="/" Icon={ChevronRightIcon}>
        Home
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-gray-100');
  });

  it('render inactive link', () => {
    render(
      <NavLink type="link" url="/about" Icon={ChevronRightIcon}>
        Home
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-white');
  });
});

describe('navigation link with sublinks', () => {
  it('render button', () => {
    render(
      <NavLink type="button" subLinks={subLinks} Icon={ChevronRightIcon}>
        Deplyment
      </NavLink>
    );
    const button = screen.getByRole('button', { name: /Deplyment/i });
    expect(button).toBeInTheDocument();
  });

  it('render inactive button', () => {
    render(
      <NavLink type="button" subLinks={subLinks} Icon={ChevronRightIcon}>
        Deplyment
      </NavLink>
    );
    const links = screen.queryAllByRole('link');
    const button = screen.getByRole('button', { name: /Deplyment/i });
    expect(button).toHaveClass('bg-white');
    expect(links).toHaveLength(0);
  });

  it('render active button', () => {
    render(
      <NavLink
        type="button"
        subLinks={[
          ...subLinks,
          { name: 'ethereum', href: '/ethereum', protocol: '' },
        ]}
        Icon={ChevronRightIcon}
      >
        Deplyment
      </NavLink>
    );
    const links = screen.getAllByRole('link');
    const button = screen.getByRole('button', { name: /Deplyment/i });
    expect(links).toHaveLength(3);
    expect(button).toHaveClass('bg-gray-100');
  });
});
