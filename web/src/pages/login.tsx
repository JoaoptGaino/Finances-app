import type { NextPage } from "next";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import Head from "next/head";
import * as Yup from "yup";
import InputField from "../../components/Form/Inputs/InputField";
import PasswordInput from "../../components/Form/Inputs/PasswordField";
import { AuthContext } from "../contexts/AuthContext";
const theme = createTheme();

const schema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
  password: Yup.string()
    .required("Obrigatório")
    .min(6, "Mínimo de 6 caracteres"),
});

interface SignInData {
  email: string;
  password: string;
}
const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);
  async function handleSubmit(data: SignInData) {
    try {
      await signIn(data);
    } catch (err: any) {
      console.error(err);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputField
                      label="E-mail"
                      name="email"
                      data-cy="userInput"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordInput
                      label="Password"
                      name="password"
                      data-cy="passInput"
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
