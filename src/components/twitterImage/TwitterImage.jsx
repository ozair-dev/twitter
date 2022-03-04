import React from 'react';

import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';

const TwitterImage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        flex: { sm: 1 },
        height: { sm: '100%' },
        width: { xs: '100%', sm: 'auto' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background:
          'url(https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png) no-repeat center'
      }}>
      <Box
        component="img"
        sx={{ maxWidth: { xs: 1, sm: 0 }, opacity: 0 }}
        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
      />
      <TwitterIcon
        sx={{
          p: '10%',
          width: '100%',
          height: 'auto',
          maxHeight: '100%',
          position: 'absolute',
          color: 'common.white'
        }}
      />
    </Box>
  );
};

export default TwitterImage;
