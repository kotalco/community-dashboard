import { SelectOption } from '@interfaces/SelectOption';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Multiselect from './Multiselect';

const options: SelectOption[] = [
  { label: 'Option One', value: 'optionOne' },
  { label: 'Option Two', value: 'optionTwo' },
];
const changeHandler = jest.fn();

describe('test rendering of componenets', () => {
  it('renders multiselect component', () => {
    render(
      <Multiselect
        options={options}
        placeholder="Choose many options..."
        label="Options"
        onChange={changeHandler}
      />
    );
    const multiSelect = screen.getByLabelText(/options/i);
    expect(multiSelect).toBeInTheDocument();
  });

  it('renders list items after click', () => {
    const multiSelect = screen.getByLabelText(/options/i);
    let listItems = screen.queryAllByRole('option');
    expect(listItems).toHaveLength(0);
    user.click(multiSelect);
    listItems = screen.queryAllByRole('option');
    expect(listItems).toHaveLength(2);
    user.click(listItems[0]);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(['optionOne']);
  });

  describe('handle change events', () => {
    it('runs handle chnage function', () => {
      changeHandler.mockReset();
      const multiSelect = screen.getByText(/choose/i);
      user.click(multiSelect);
      const listItems = screen.queryAllByRole('option');
      user.click(listItems[0]);
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith(['optionOne']);
    });

    it('show choosed options after clicking on option', () => {
      const multiSelect = screen.getByLabelText(/options/i);
      user.click(multiSelect);
      const listItems = screen.queryAllByRole('option');
      user.click(listItems[0]);
      const choosedOption = screen.getByText(/optionone/i);
      expect(choosedOption).toBeInTheDocument();
    });
  });
});

describe('render listbox with errors and options', () => {
  it('remove choosed option after clicking on option if already choosed', () => {
    render(
      <Multiselect
        options={options}
        placeholder="Choose many options..."
        label="Options"
        onChange={changeHandler}
        value={['optionOne']}
        error="This is an error"
        href="/"
        hrefTitle="URL Title"
      />
    );
    changeHandler.mockReset();

    const multiSelect = screen.getByLabelText(/options/i);
    user.click(multiSelect);
    const optionOne = screen.getByRole('option', { name: /one/i });
    user.click(optionOne);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith([]);
    const empty = screen.queryByText(/optionone/i);
    expect(empty).not.toBeInTheDocument();
  });

  it('check for errors', () => {
    const multiSelect = screen.getByLabelText(/options/i);
    expect(multiSelect).toHaveClass('border-red-300');
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toBeInTheDocument();
  });

  it('checks for link if href is added', () => {
    const multiSelect = screen.getByLabelText(/options/i);
    user.click(multiSelect);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('renders with multiple values', () => {
  it('checks that one value is removed if selected', () => {
    changeHandler.mockReset();
    render(
      <Multiselect
        options={options}
        placeholder="Choose many options..."
        label="Options"
        onChange={changeHandler}
        value={['optionOne', 'optionTwo']}
        error="This is an error"
      />
    );

    const multiSelect = screen.getByLabelText(/options/i);
    user.click(multiSelect);
    const optionOne = screen.getByRole('option', { name: /one/i });
    user.click(optionOne);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(['optionTwo']);
    const text = screen.queryByText('optionTwo');
    expect(text).toBeInTheDocument();
  });
});
