import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import NavLink from '../../atoms/NavLink/NavLink';
import NavLinks from './NavLinks';

jest.mock('../../atoms/NavLink/NavLink');
mocked(NavLink).mockImplementation(() => <li>List item</li>);

it('renders navigation links', () => {
  render(<NavLinks />);
  const sidebar = screen.getByRole('navigation');
  expect(sidebar).toBeInTheDocument();
});
