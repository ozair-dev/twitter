import React, { useEffect } from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Leftbar from '../leftBar';
import RightBar from '../rightBar';
import Home from '../home';

import Box from '@mui/material/Box';

const Surf = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = location.pathname.split('/')[2];
    if (!currentPage) {
      navigate('home');
    }
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Leftbar />
      <Box
        sx={{
          flex: 3,
          borderLeft: 1,
          borderRight: 1,
          minHeight: '100vh',
          borderColor: 'secondary.light'
        }}>
        <Routes>
          <Route default path="home" element={<Home />} />
        </Routes>
      </Box>
      <RightBar />
    </Box>
  );
};

export default Surf;
