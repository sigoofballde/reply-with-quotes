'use client'

import { ContentCopy, CopyAll } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  inputLabelClasses,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { baseQuoteStyle, iconButtonQuoteStyle } from './globalStyles'
import React, { ChangeEvent, useState } from 'react'
import { Quote } from 'src/interfaces/general'

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
    setQuoteCopiedDialogOpen(true)
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

  const handleDialogClose = () => {
    setQuoteCopiedDialogOpen(false)
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
          label="Conversation for reply"
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
        {quoteCopiedDialogOpen && (
          <Dialog open sx={{ '& .MuiDialog-paper': { width: '80%' } }}>
            <DialogTitle className="bg-blue-300 to-white">Quote Copied</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                // color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers className="bg-blue-300 to-white">
              <Typography>{`Quote copied to clipboard.`}</Typography>
            </DialogContent>
            <DialogActions className="bg-blue-300 to-white">
              <Button
                onClick={handleDialogClose}
                variant="contained"
                className="bg-blue-950  hover:bg-blue-900"
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
