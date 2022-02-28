import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Leftbar from '../leftBar';

import Box from '@mui/material/Box';

const Surf = () => {
  return (
    <Box sx={{ display: 'felx' }}>
      <Leftbar />
      <Box sx={{ flex: 1 }}></Box>
    </Box>
  );
};

export default Surf;
