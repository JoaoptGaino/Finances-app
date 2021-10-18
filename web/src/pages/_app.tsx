import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { theme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
