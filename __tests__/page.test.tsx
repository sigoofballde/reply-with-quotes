import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Home from '@/app/page'
import fetchMock from 'fetch-mock-jest'
import { formattedAPIResponse } from 'testData/gemini'

const setup = async () => {
  act(() => {
    render(<Home />)
  })
}

const apiUrl = `http://localhost:7069/getConversation`

describe('Page display/manipulation', () => {
  test('Page displays correct fields', async () => {
    setup()
    expect(await screen.findByLabelText('Conversation for reply')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Get Reply' })).toBeInTheDocument()
  })
})

describe.only('Data display/manipulation', () => {
  test.only('Quotes display when there are 3 quotes', async () => {
    fetchMock.getOnce(apiUrl, formattedAPIResponse)
    setup()
    userEvent.type(await screen.findByPlaceholderText('Conversation for reply'), 'Hello')
    userEvent.click(await screen.findByRole('button', { name: 'Get Reply' }))

    expect(
      await screen.findAllByText(
        `${formattedAPIResponse[0].quote} - ${formattedAPIResponse[0].reference}`,
      ),
    ).toBeInTheDocument()
  })
  test('Quotes display when quote is missing', () => {})
  test('Quote displays when there is only 1', () => {})
})
