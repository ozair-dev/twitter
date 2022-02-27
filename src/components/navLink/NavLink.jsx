import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navbutton = ({ to, IconOutlined, IconFilled, text, active }) => {
  return (
    <Link to={to}>
      <Box component="div" sx={{ '&:hover span': { backgroundColor: '#dddcdc' } }}>
        <Box
          component="span"
          sx={{
            px: 2,
            py: 1,
            width: 'fit-content',
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            '& svg': {
              fontSize: 'x-large'
            }
          }}>
          {active ? <IconFilled /> : <IconOutlined />}
          <Typography
            fontWeight={active ? 'bold' : 400}
            ml={2}
            fontSize={19}
            sx={{ display: { xs: 'none', md: 'initial' } }}>
            {text}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default Navbutton;
