import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import IconButton from './IconButton';

describe('icon button', () => {
  const handleClick = jest.fn();

  it('render button', () => {
    render(
      <IconButton onClick={handleClick} className="rounded-md">
        <span>Icon</span>
      </IconButton>
    );
    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();
  });

  it('add classes', () => {
    render(
      <IconButton onClick={handleClick} className="rounded-md">
        <span>Icon</span>
      </IconButton>
    );
    const iconButton = screen.getByRole('button');
    expect(iconButton).toHaveClass('rounded-md');
  });

  it('run callback function on click', () => {
    render(
      <IconButton onClick={handleClick} className="rounded-md">
        <span>Icon</span>
      </IconButton>
    );
    const iconButton = screen.getByRole('button');
    user.click(iconButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('render react element inside button', () => {
    render(
      <IconButton onClick={handleClick} className="rounded-md">
        <span>Icon</span>
      </IconButton>
    );
    const iconButton = screen.getByRole('button');
    expect(iconButton).toContainHTML('<span>Icon</span>');
  });
});

describe('icon button with no classes added', () => {
  it('renders default classes only', () => {
    render(
      <IconButton onClick={jest.fn()}>
        <span>Icon</span>
      </IconButton>
    );
    const iconButton = screen.getByRole('button');
    expect(iconButton).not.toHaveClass('rounded-md');
  });
});
