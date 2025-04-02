import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A18C9F',
    },
    secondary: {
      main: '#D1837D',
    },
    background: {
      default: '#F1EEEE',
      paper: '#FFFFFF',   
    },
    text: {
      primary: '#4f4d4f',
      secondary: '#4f4d4f', 
    },
  },
  typography: {
    fontFamily: ['"Roboto"', 'sans-serif'].join(','),
  },
})
