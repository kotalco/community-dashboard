import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  beforeEach(() => {
    render(
      <ButtonGroup
        label="Menu"
        buttons={[{ name: 'Settings', href: '/settings' }]}
      />
    );
  });

  it('render button group with label', () => {
    const labelText = screen.getByText(/menu/i);
    expect(labelText).toBeInTheDocument();
  });

  describe('after click on the button', () => {
    beforeEach(() => {
      const button = screen.getByRole('button');
      user.click(button);
    });

    it('render menu after click on button group', () => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it('render menu items after click on button group', () => {
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(1);
    });

    it('render menu items with no active classes', () => {
      const menuItems = screen.getAllByRole('link');
      menuItems.forEach((menuItem) => {
        expect(menuItem).toHaveClass('text-gray-700');
      });
    });

    it('render menu items and hover active classes', () => {
      const menuItems = screen.getAllByRole('link');
      user.hover(menuItems[0]);
      expect(menuItems[0]).toHaveClass('bg-gray-100');
    });
  });
});
