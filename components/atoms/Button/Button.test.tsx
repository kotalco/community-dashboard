import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'

const handleClick = jest.fn()

beforeEach(() => {
  render(<Button onClick={handleClick}>Click Me</Button>)
})

test('Render Buttom with right text', () => {
  expect(screen.getByText(/Click/)).toBeInTheDocument()
})

test('Button handles click in a right a way', () => {
  userEvent.click(screen.getByRole('button'))
  expect(handleClick).toBeCalled()
  expect(handleClick).toBeCalledTimes(1)
})
