import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IconButton from './IconButton'
import BellIcon from '../../Icons/BellIcon/BellIcon'

test('Render sr-only text', () => {
  render(
    <IconButton onClick={jest.fn()} srText="setting">
      <BellIcon />
    </IconButton>
  )
  expect(screen.getByText(/setting/)).toBeInTheDocument()
})

test('Button handles click correctly', () => {
  const handleClick = jest.fn()
  render(
    <IconButton srText="setting" onClick={handleClick}>
      <BellIcon />
    </IconButton>
  )
  userEvent.click(screen.getByRole('button'))
  expect(handleClick).toBeCalled()
  expect(handleClick).toBeCalledTimes(1)
})
