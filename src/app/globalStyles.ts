import { SxProps } from '@mui/material'

const heightWidth: number = 80

export const baseQuoteStyle: SxProps = {
  borderRadius: 1,
  mt: 2,
  height: heightWidth,
}

export const iconButtonQuoteStyle: SxProps = {
  ...baseQuoteStyle,
  mx: 1,
  width: heightWidth,
}
