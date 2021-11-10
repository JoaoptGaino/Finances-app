import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const defaultTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        footer: {
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.75rem",
          lineHeight: "1.3125rem",
          borderBottom: "0px",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: grey[600],
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1b801e",
    },
    background: {
      default: "#f3f3f3",
    },
  },
});

export default defaultTheme;
