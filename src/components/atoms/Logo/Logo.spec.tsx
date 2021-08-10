import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('logo component', () => {
  it('renders logo component', () => {
    render(<Logo />);
    const logo = screen.getByText(/kotal/i);
    expect(logo).toBeInTheDocument();
  });
});
