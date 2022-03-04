import React from 'react';

import { Route, Routes, Link as RouterLink } from 'react-router-dom';

import OAuth from '../oAuth';
import SignUp from '../signUp';
import SignIn from '../signIn';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import TwitterIcon from '@mui/icons-material/Twitter';

const Auth = () => {
  return (
    <Box
      sx={{
        minWidth: { xs: '100%', sm: '45vw' },
        p: 5,
        '& button': {
          textTransform: 'none',
          borderRadius: 5,
          fontWeight: 'bold',
          width: 300
        }
      }}>

      <TwitterIcon sx={{ fontSize: '3rem' }} color="primary" />

      <Box
        sx={{
          typography: { xs: 'h3', sm: 'h2' },
          fontWeight: { xs: 800, sm: 800 },
          my: 5,
          color: 'common.black'
        }}>
        Happening now
      </Box>

      <Box
        sx={{
          typography: { xs: 'h5', sm: 'h4' },
          fontWeight: { xs: 800, sm: 800 },
          my: 5,
          color: 'common.black'
        }}>
        Join Twitter today.
      </Box>

      {/* Auth Methods */}

      <Box sx={{ width: 'min-content' }}>

        <OAuth />

        <Divider textAlign="center" sx={{ my: 1, fontWeight: 'bold' }}>
          or
        </Divider>

        {/* Sign up */}
        <RouterLink to="signup" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Sign up with Email Address</Button>
        </RouterLink>

        <Typography variant="p" component="p" fontSize="10px" mt={1}>
          By signing up, you agree to the <Link href="#">Terms of Service</Link> and{' '}
          <Link href="#">Privacy Policy</Link>, including <Link href="#">Cookie Use</Link>.
        </Typography>

        {/* Login */}
        <Typography variant="h6" mt={4}>
          Already have an account?
        </Typography>

        <RouterLink to="signin" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Sign in</Button>
        </RouterLink>

      </Box>

      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>

    </Box>
  );
};

export default Auth;
