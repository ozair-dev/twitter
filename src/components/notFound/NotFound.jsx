import React from 'react';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Notfound = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Box
        component="img"
        alt="tom"
        src="https://firebasestorage.googleapis.com/v0/b/ozlearning.appspot.com/o/images%2Fwhoknows.jpg?alt=media&token=1627ea90-dac2-4a77-a0dd-4f5d22cef238"
        sx={{ width: 1, height: 'auto', borderRadius: 5 }}
      />
      <Typography fontSize={40} color="gray" textAlign="center">
        Nothing here
      </Typography>

      <Typography component="span">
        The page you are looking for does not exist. <Link to="home">Go Home</Link>
      </Typography>
    </Box>
  );
};

export default Notfound;
