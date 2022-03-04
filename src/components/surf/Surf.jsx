import React, { useEffect } from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Leftbar from '../leftBar';
import RightBar from '../rightBar';
import Home from '../home';
import NotFound from '../notFound';

import Box from '@mui/material/Box';

const Surf = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const currentPage = location.pathname.split('/')[2];

    // navigate to home path as default path
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
          <Route index element={<div />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      <RightBar />
    </Box>
  );
};

export default Surf;
