import { render, screen } from '@testing-library/react';
import InputLabel from './InputLabel';

describe('input label', () => {
  let inputLabel: HTMLElement;
  beforeEach(() => {
    render(
      <InputLabel htmlFor="name" labelClassName="rounded">
        Name:
      </InputLabel>
    );
    inputLabel = screen.getByText(/name/i);
  });
  it('renders html inout label', () => {
    expect(inputLabel).toBeInTheDocument();
  });

  it('renders input label with classes', () => {
    expect(inputLabel).toHaveClass('rounded');
  });
});

describe('input label without class', () => {
  let inputLabel: HTMLElement;
  beforeEach(() => {
    render(<InputLabel htmlFor="name">name:</InputLabel>);
    inputLabel = screen.getByText(/name/i);
  });

  it('renders input label with deafult classes', () => {
    expect(inputLabel).not.toHaveClass('mt-5');
  });
});
