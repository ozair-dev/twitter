import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navbutton = ({ value, IconOutlined, IconFilled, activePage }) => {
  const isActive = activePage === value.toLowerCase();
  return (
    <Link to={value.toLowerCase()}>
      <Box component="div" sx={{ '&:hover span': { bgcolor: '#dddcdc' } }}>
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
          {isActive ? IconFilled : IconOutlined}
          <Typography
            fontWeight={isActive ? 'bold' : 400}
            ml={2}
            fontSize={19}
            sx={{ display: { xs: 'none', md: 'initial' } }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default Navbutton;
