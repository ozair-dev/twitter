import React from 'react';

import TwitterImage from '../twitterImage';
import Auth from '../auth';

import Box from '@mui/material/Box';

const Welcome = () => {
  return (
    <Box
      sx={{
        height: { sm: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row-reverse' }
      }}>
      <Auth />
      <TwitterImage />
    </Box>
  );
};

export default Welcome;
