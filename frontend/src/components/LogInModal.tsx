import { useForm } from "react-hook-form";
import * as GameApi from "../network/api";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_error";
import { LoginCredentials, LoginModalProps } from "./types";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styleUtils from '../styles/utils.module.css';
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
  Typography,
  Button,
} from "@mui/material";


const LogInModal = ({ onLoginSuccsessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();


  const {register,handleSubmit,formState: { errors, isSubmitting }} = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const response = await GameApi.login(credentials);
      onLoginSuccsessful(response);
      try {
        const game = await GameApi.getGame();
        if(game){
          const wordLength = game.wordLength;
          navigate(`/gamepage/${wordLength}`);
        }
      }catch(errror){
        navigate("/startGame");
      }
    
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (


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
          Sign In
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
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
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
         
          <Button className={styleUtils.buttonStyle}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: {backgroundColor:'purple',color:'white',":hover":{
              backgroundColor:'#900390'
            }}}
          }
            disabled={isSubmitting}
          >
           Sign In 
          </Button>
     
          
          <Grid container>
            <Grid item>
              <Link href="/SignUpModal" variant="body2" style={{color:'purple',textDecoration: 'none'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  
  );
}; 

export default LogInModal;
