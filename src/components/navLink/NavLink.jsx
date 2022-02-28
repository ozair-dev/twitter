import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navbutton = ({ value, IconOutlined, IconFilled }) => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const currentPage = location.pathname.split('/')[2];
    setActive(currentPage === value.toLowerCase());
  }, [location]);

  return (
    <Link to={value.toLowerCase()}>
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
            {value}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default Navbutton;
