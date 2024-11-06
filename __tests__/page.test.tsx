import { act, render, screen } from '@testing-library/react'
import Home from '@/app/page'

const setup = async () => {
  act(() => {
    render(<Home />)
  })
}

describe('Page display/manipulation', () => {
  test('Page displays correct fields', async () => {
    setup()
    expect(await screen.findByLabelText('Conversation for reply')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Get Reply' })).toBeInTheDocument()
  })
})

describe('Data display/manipulation', () => {
  test('Quotes display when there are 3 quotes', () => {})
  test('Quotes display when quote is missing', () => {})
  test('Quote displays when there is only 1', () => {})
})
