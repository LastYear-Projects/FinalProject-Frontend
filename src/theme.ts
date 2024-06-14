import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    text:{
      primary: '#000000',
      secondary: '#FFFFFF',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#9A9A9A',
    },
  },
  typography: {
    fontWeightBold: 600,
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
