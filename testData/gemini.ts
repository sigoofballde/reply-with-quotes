import { Quote } from '@/interfaces/general'

export const apiResponse: Quote[] = [
  {
    quote: `\"**I'm sorry, I don't speak English.**\"`,
    reference: '*The Princess Bride* ',
  },
  { quote: '"**You talking to me?**"', reference: '*Taxi Driver* ' },
  {
    quote: `\"I'm feeling... like a very large, very purple, very angry grape.\"`,
    reference: 'The Simpsons** ',
  },
]

export const formattedAPIResponse: Quote[] = [
  {
    quote: `I'm sorry, I don't speak English.`,
    reference: 'The Princess Bride',
  },
  { quote: 'You talking to me?', reference: 'Taxi Driver' },
  {
    quote: `I'm feeling... like a very large, very purple, very angry grape.`,
    reference: 'The Simpsons',
  },
]
