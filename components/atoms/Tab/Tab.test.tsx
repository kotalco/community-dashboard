import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Tab from './Tab'

const handleClick = jest.fn()

describe('Render dangerous tab', () => {
  test('Render active tab', () => {
    render(
      <Tab active danger onClick={handleClick}>
        Dangerous Zone
      </Tab>
    )
    expect(screen.getByText(/danger/i)).toHaveClass('bg-red-100 text-red-700')
  })

  test('Render inactive tab', () => {
    render(
      <Tab active={false} danger onClick={handleClick}>
        Dangerous Zone
      </Tab>
    )
    expect(screen.getByText(/danger/i)).toHaveClass(
      'text-red-500 hover:text-red-700'
    )
  })
})

describe('Render noraml tab', () => {
  test('Render active tab', () => {
    render(
      <Tab active onClick={handleClick}>
        Zone
      </Tab>
    )
    expect(screen.getByText(/zone/i)).toHaveClass(
      'bg-indigo-100 text-indigo-700'
    )
  })

  test('Render inactive tab', () => {
    render(
      <Tab active={false} onClick={handleClick}>
        Zone
      </Tab>
    )
    expect(screen.getByText(/zone/i)).toHaveClass(
      'text-gray-500 hover:text-gray-700'
    )
  })
})

test('Test click on tab', () => {
  render(
    <Tab onClick={handleClick} active>
      Zone
    </Tab>
  )
  userEvent.click(screen.getByText(/zone/i))
  expect(handleClick).toBeCalled()
  expect(handleClick).toBeCalledTimes(1)
})
