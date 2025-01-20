import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 768,
      lg: 1024,
      xl: 1366,
      xxl: 1600,
      xxxl: 1920,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#D3648B',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Aleo, Roboto, Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#000000', 
        },
      },
    },
  },
});

export default theme;