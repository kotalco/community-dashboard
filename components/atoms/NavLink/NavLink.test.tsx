import { screen, render } from '@testing-library/react'

import NavLink from './NavLink'
import KeyIcon from '../../Icons/KeyIcon/KeyIcon'

test('Render active naviagtion link', () => {
  render(
    <NavLink url="/" Icon={KeyIcon}>
      Home
    </NavLink>
  )
  expect(screen.getByRole('link')).toHaveClass('bg-gray-100')
  expect(screen.getByTestId('icon')).toHaveClass('text-gray-500')
})

test('Render inactive naviagtion link', () => {
  render(
    <NavLink url="/about" Icon={KeyIcon}>
      About Us
    </NavLink>
  )
  expect(screen.getByRole('link')).toHaveClass('text-gray-600')
  expect(screen.getByTestId('icon')).toHaveClass('text-gray-400')
})

test('Do not render icon if no Icon', () => {
  render(
    <NavLink Icon={KeyIcon} url="/about">
      About Us
    </NavLink>
  )
  expect(screen.queryByTestId('icon')).toBeNull()
})
