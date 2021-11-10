import { CssBaseline, ThemeProvider } from "@mui/material";
import { Snackbar } from "materialism/components";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import defaultTheme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pagesWithoutMenu = ["/login"];
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        {!pagesWithoutMenu.includes(router.pathname) && <Navbar />}
        <Component {...pageProps} />
        <Snackbar />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
