import { useForm } from "react-hook-form";
import * as GameApi from "../network/api";
import { useState } from "react";
import { ConflictError } from "../errors/http_error";
import { SignupCredentials, SignUpModalProps } from "./types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  Button,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const SignUpModal = ({ onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>();

  async function onSubmit(credentials: SignupCredentials) {
    try {
      const newUser = await GameApi.signup(credentials);
      onSignUpSuccessful(newUser);
      navigate("/startGame");
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused ": {
                  "& > fieldset": {
                  borderColor: "purple",
                  }
                },"& .MuiInputLabel-root.Mui-focused": {color: 'purple'}
              }}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused ": {
                  "& > fieldset": {
                  borderColor: "purple",
                  }
                },"& .MuiInputLabel-root.Mui-focused": {color: 'purple'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused ": {
                  "& > fieldset": {
                  borderColor: "purple",
                  }
                },"& .MuiInputLabel-root.Mui-focused": {color: 'purple'}
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: {
                  backgroundColor: "purple",
                  color: "white",
                  ":hover": {
                    backgroundColor: "#900390",
                  },
                },
              }}
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2" style={{color:'purple',textDecoration: 'none'}}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUpModal;
