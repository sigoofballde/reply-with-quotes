'use client'

import { ChangeEvent, useState } from 'react'

import { Box, Button, Dialog, IconButton, TextField, Tooltip } from '@mui/material'
import { inputLabelClasses } from '@mui/material'
import { Quote } from '@/interfaces/general'
import { ContentCopy, CopyAll } from '@mui/icons-material'
import { baseQuoteStyle, iconButtonQuoteStyle } from './globalStyles'

export default function Home() {
  const [conversation, setConversation] = useState<string | null>(null)
  const [converstaionError, setConversationError] = useState<string | null>(null)
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [quoteCopiedDialogOpen, setQuoteCopiedDialogOpen] = useState<boolean>(false)

  const copyQuote = (quoteToCopy: number, copyReference: boolean) => {
    let copiedQuote: string = quotes![quoteToCopy].quote
    if (copyReference) {
      console.log('Quote & Reference')
      copiedQuote += ` - ${quotes![quoteToCopy].reference}`
    }

    navigator.clipboard.writeText(copiedQuote)
    alert(`${copyReference ? 'Quote & reference' : 'Quote'} copied to clipboard.`)
  }

  const handleConversationReplyRequest = async () => {
    if (conversation) {
      setConversationError(null)

      const replies = await fetch(`http://localhost:7069/getConversation`, {
        method: 'POST',
        body: JSON.stringify({ conversation }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const result: Quote[] = await replies.json()
      setQuotes(result)
    } else {
      setConversationError('Conversation is empty')
    }
  }

  const handleConversationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConversation(event.target.value)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex">
        {/* <Switcha
          onChange={handleTheme}
          name={darkMode ? 'Dark Mode Them' : 'System Default Theme'}
        /> */}
      </header>
      <main className="flex-grow flex-col gap-8 row-start-2 items-center sm:items-start container mx-auto">
        <TextField
          className="bg-blue-500 flex-grow"
          label="Conversation For Reply"
          variant="outlined"
          onChange={handleConversationChange}
          sx={{ borderRadius: 1, mb: 1 }}
          slotProps={{
            inputLabel: {
              sx: {
                mb: 10,
                color: 'white',
                [`&.${inputLabelClasses.shrink}`]: {
                  // set the color of the label when shrinked (usually when the TextField is focused)
                  color: 'white',
                },
              },
            },
          }}
          fullWidth
          error={!!converstaionError}
          helperText={converstaionError ? converstaionError : ''}
          multiline
        />
        <Button
          className="bg-blue-950 hover:bg-blue-900"
          variant="contained"
          onClick={handleConversationReplyRequest}
          sx={{ width: '100%' }}
        >
          Get Reply
        </Button>
        {quotes && (
          <Box>
            {quotes[0].quote !== '' && (
              <Box sx={{ display: 'flex' }}>
                <TextField
                  className="bg-blue-300 to-white flex-grow"
                  variant="outlined"
                  sx={baseQuoteStyle}
                  value={`${quotes[0].quote} - ${quotes[0].reference}`}
                  multiline
                />
                {/* TODO: top: -2 not working, check on this! */}
                <Tooltip title="Copy Quote Only" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(0, false)}
                    sx={iconButtonQuoteStyle}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Quote & Reference" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(0, true)}
                    sx={iconButtonQuoteStyle}
                  >
                    <CopyAll />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {quotes[1].quote !== '' && (
              <Box sx={{ display: 'flex' }}>
                <TextField
                  className="bg-blue-300 to-white flex-grow"
                  variant="outlined"
                  sx={{ borderRadius: 1, mt: 2 }}
                  value={`${quotes[1].quote} - ${quotes[1].reference}`}
                  multiline
                />
                <Tooltip title="Copy Quote Only" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(1, false)}
                    sx={iconButtonQuoteStyle}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Quote & Reference" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(1, true)}
                    sx={iconButtonQuoteStyle}
                  >
                    <CopyAll />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {quotes[2].quote !== '' && (
              <Box sx={{ display: 'flex' }}>
                <TextField
                  className="bg-blue-300 to-white flex-grow"
                  variant="outlined"
                  sx={{ borderRadius: 1, mt: 2 }}
                  value={`${quotes[2].quote} - ${quotes[2].reference}`}
                  multiline
                />
                <Tooltip title="Copy Quote Only" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(2, false)}
                    sx={iconButtonQuoteStyle}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Quote & Reference" sx={{ top: -2 }}>
                  <IconButton
                    className="bg-blue-950  hover:bg-blue-900 flex"
                    onClick={() => copyQuote(2, true)}
                    sx={iconButtonQuoteStyle}
                  >
                    <CopyAll />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        )}
        {quoteCopiedDialogOpen && <Dialog open title="Copied To clipboard" />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
