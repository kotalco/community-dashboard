import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

it('renders list item compoenet', () => {
  render(<ListItem title="Title" link="/" />);
  const listItem = screen.getByRole('listitem');
  expect(listItem).toBeInTheDocument();
});
