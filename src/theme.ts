import { createTheme, ThemeOptions } from '@mui/material/styles';

export const COLORS = {
  PRIMARY: '#000000',
  SECONDARY: '#b6b6b6',
  BACKGROUND: '#FFFFFF',
  BACKGROUND_BUTTONS: '#d3d3d3',
  BACKGROUND_ICONS: '#b6b6b6',
  BACKGROUND_ON_HOVER: '#b6b6b6',
  TEXT_ON_HOVER_BUTTON: '#ffffff',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ff9800',
};

export const STYLES = {
  BORDER_RADIUS: 8,
  FONT_FAMILY: 'Roboto, Arial, sans-serif',
  FONT_WEIGHT_BOLD: 600,
  BOX_SHADOW: `0px 0px 5px 1px ${COLORS.SECONDARY}`,
};

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
      contrastText: COLORS.BACKGROUND_ICONS,
    },
    background: {
      default: COLORS.BACKGROUND,
      paper: COLORS.PRIMARY,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: STYLES.FONT_FAMILY,
          fontWeightBold: STYLES.FONT_WEIGHT_BOLD,
          '& .MuiOutlinedInput-root': {
            borderRadius: STYLES.BORDER_RADIUS,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: COLORS.PRIMARY,
          borderRadius: STYLES.BORDER_RADIUS,
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.PRIMARY,
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.BACKGROUND_ON_HOVER,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.BACKGROUND_ON_HOVER,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: STYLES.FONT_FAMILY,
          fontWeight: STYLES.FONT_WEIGHT_BOLD,
          '& .MuiOutlinedInput-root': {
            borderRadius: STYLES.BORDER_RADIUS,
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
