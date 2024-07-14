import { createTheme, ThemeOptions } from "@mui/material/styles";

export const COLORS = {
  PRIMARY: "#000000",
  SECONDARY: "#5a5a5a",
  BACKGROUND: "#9A9A9A",
  TEXT_ON_HOVER_BUTTON: "#ffffff",
  SUCCESS: "#4caf50",
  ERROR: "#f44336",
  WARNING: "#ff9800",
};

export const STYLES = {
  BORDER_RADIUS: 8,
  FONT_FAMILY: "Roboto, Arial, sans-serif",
  FONT_WEIGHT_BOLD: 600,
  BOX_SHADOW: `1px 3px 5px ${COLORS.BACKGROUND}`,
};

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    background: {
      default: COLORS.BACKGROUND,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: STYLES.FONT_FAMILY,
          fontWeightBold: STYLES.FONT_WEIGHT_BOLD,
          "& .MuiOutlinedInput-root": {
            borderRadius: STYLES.BORDER_RADIUS,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: COLORS.PRIMARY,
          borderRadius: STYLES.BORDER_RADIUS,
          backgroundColor: COLORS.BACKGROUND,
          textTransform: "none",
          "&:hover": {
            backgroundColor: COLORS.SECONDARY,
            boxShadow: STYLES.BOX_SHADOW,
            color: COLORS.TEXT_ON_HOVER_BUTTON,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.PRIMARY,
          "&.Mui-focused": {
            color: COLORS.BACKGROUND,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.BACKGROUND,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.BACKGROUND,
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
