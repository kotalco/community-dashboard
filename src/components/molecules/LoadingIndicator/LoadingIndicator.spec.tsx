import { render, screen } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

it('reders a spinner on the screen', () => {
  render(<LoadingIndicator />);

  const spinnerElement = screen.getByTestId('loading');
  expect(spinnerElement).toBeInTheDocument();
});
