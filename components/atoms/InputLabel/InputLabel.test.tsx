import { render, screen } from '@testing-library/react'

import InputLabel from './InputLabel'

test('Render label correctly', () => {
  render(<InputLabel htmlFor="full-name">Name: </InputLabel>)
  expect(screen.getByText(/name/i)).toBeInTheDocument()
  expect(screen.getByText(/name/i)).not.toHaveClass('sr-only')
})

test('Check for class sr-only if available', () => {
  render(
    <InputLabel htmlFor="full-name" srOnly>
      Name:
    </InputLabel>
  )
  expect(screen.getByText(/name/i)).toHaveClass('sr-only')
})

test('Check for classes if available', () => {
  render(
    <InputLabel htmlFor="full-name" className="test-class">
      Name:
    </InputLabel>
  )
  expect(screen.getByText(/name/i)).toHaveClass('test-class')
})
