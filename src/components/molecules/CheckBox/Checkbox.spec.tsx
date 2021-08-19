import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Checkbox from './CheckBox';

describe('renders checkbox', () => {
  it('renders enabled checkbox on the screen', () => {
    const clickHandler = jest.fn();

    render(
      <Checkbox
        name="yes"
        label="Yes"
        onBlur={jest.fn()}
        onChange={clickHandler}
        value="yes"
      />
    );
    const checkbox = screen.getByLabelText(/yes/i);
    expect(checkbox).toBeInTheDocument();
    user.click(checkbox);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('renders disabled checkbox on the screen', () => {
    const clickHandler = jest.fn();

    render(
      <Checkbox
        name="yes"
        label="Yes"
        onBlur={jest.fn()}
        onChange={clickHandler}
        value="yes"
        disabled={true}
      />
    );
    const checkbox = screen.getByLabelText(/yes/i);
    expect(checkbox).toBeInTheDocument();
    user.click(checkbox);
    expect(clickHandler).not.toHaveBeenCalled();
  });
});
