import { render, screen } from '@testing-library/react';

import Hello from './Hello';

it('render hello word', () => {
  render(<Hello />);
  const myElement = screen.getByText('Hello World');
  expect(myElement).toBeInTheDocument();
});
