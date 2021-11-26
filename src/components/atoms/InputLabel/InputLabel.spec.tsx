import { render, screen } from '@testing-library/react';
import InputLabel from './InputLabel';

describe('input label', () => {
  let inputLabel: HTMLElement;

  it('renders html inout label', () => {
    render(
      <InputLabel htmlFor="name" labelClassName="rounded">
        Name:
      </InputLabel>
    );
    inputLabel = screen.getByText(/name/i);

    expect(inputLabel).toBeInTheDocument();
  });

  it('renders input label with classes', () => {
    render(
      <InputLabel htmlFor="name" labelClassName="rounded">
        Name:
      </InputLabel>
    );
    inputLabel = screen.getByText(/name/i);
    expect(inputLabel).toHaveClass('rounded');
  });
});

describe('input label without class', () => {
  let inputLabel: HTMLElement;

  it('renders input label with deafult classes', () => {
    render(<InputLabel htmlFor="name">name:</InputLabel>);
    inputLabel = screen.getByText(/name/i);
    expect(inputLabel).not.toHaveClass('mt-5');
  });
});
