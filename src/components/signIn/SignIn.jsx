import React, { useState, useContext } from 'react';

import UserContext from '../../providers/UserContext';

import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

import AuthModal from '../authModal';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useForm, Controller } from 'react-hook-form';

import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = object({
  email: string().lowercase().email('Must be a valid email address').required('Email is required'),
  password: string().required('Password is required')
}).required();

const SignIn = () => {
  const navigate = useNavigate();
  const [signInErrors, setSignInErrors] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <AuthModal>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mt={3}>
          Sign in to Twitter
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              autoFocus
              variant="outlined"
              id="email-basic"
              label="Email"
              margin="dense"
              helperText={errors.email?.message || signInErrors.email?.message}
              error={!!errors.email || !!signInErrors.email}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              id="password-basic"
              label="Password"
              margin="normal"
              helperText={signInErrors.password?.message || errors.password?.message}
              error={!!errors.password || !!signInErrors.password}
              type="password"
              autoComplete="current-password"
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ width: 300 }}>
          Sign in
        </Button>

        <Button variant="outlined" sx={{ width: 300, my: 2 }}>
          Forgot password?
        </Button>

        <Typography>
          Dont have an account?{' '}
          <Button variant="text" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
        </Typography>
      </Box>
    </AuthModal>
  );

  function onSubmit({ email, password }) {
    setSignInErrors({});
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // success
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/wrong-password':
            setSignInErrors((prev) => ({
              ...prev,
              password: { message: 'Password you entered is not correct' }
            }));
            break;

          case 'auth/user-not-found':
            setSignInErrors((prev) => ({
              ...prev,
              email: {
                message: 'No account is registered with this email address'
              }
            }));
            break;
          default:
            setSignInErrors({
              password: {
                message: 'Could not sign in. Make sure you entered correct email and password'
              }
            });
            break;
        }
      });
  }
};

export default SignIn;
