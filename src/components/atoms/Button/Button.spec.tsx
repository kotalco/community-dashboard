import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Check for text in the button', () => {
  it('in case of link', () => {
    render(<Button href="/">Homepage</Button>);
    const text = screen.getByText(/Homepage/);
    expect(text).toBeInTheDocument();
  });

  it('in case of button', () => {
    render(<Button>Homepage</Button>);
    const text = screen.getByText(/Homepage/);
    expect(text).toBeInTheDocument();
  });
});

describe('render button or link', () => {
  it('render link if href is added', () => {
    render(<Button href="/home">Go to home</Button>);
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
  });

  it('render button type button if no href is added', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('render submit button', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});

describe('Check for loading state in a button', () => {
  it('add loading spinner if loading=true', () => {
    render(<Button loading={true}>Click Me</Button>);
    const spinnerIcon = screen.getByRole('img');
    expect(spinnerIcon).toBeInTheDocument();
  });

  it('has not loading spinner if no loading', () => {
    render(<Button>Click Me</Button>);
    const spinnerIcon = screen.queryByRole('img');
    expect(spinnerIcon).not.toBeInTheDocument();
  });
});

describe('button state', () => {
  const handleClick = jest.fn();

  it('disable button if disabled=true', () => {
    render(
      <Button onClick={handleClick} disabled={true}>
        Click Me
      </Button>
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('run callback function if button not disabled', () => {
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
