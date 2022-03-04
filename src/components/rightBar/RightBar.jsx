import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { IoSettingsOutline } from 'react-icons/io5';

import { RiMoreFill } from 'react-icons/ri';


// Dummy trends data
const trends = [
  { name: 'Digital assets & cryptocurrency · Trending', tag: '#Saitam', tweets: '42.4K Tweets' },
  { name: 'Politics · Trending', tag: '#istandwithrussia', tweets: '34.1K Tweets' },
  { name: 'Trending in Pakistan', tag: '#ShahRukhKhan', tweets: '57.9K Tweets' },
  { name: 'Trending in Pakistan', tag: '#BoysReadyHain', tweets: '5,528 Tweets' },
  { name: 'Politics · Trending', tag: '#DoubleStandards', tweets: '7,174 Tweets' }
];

const Rightbar = () => {
  return (
    <Box
      sx={{
        flex: 2,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        py: 1,
        px: 3,
        maxHeight: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'scroll'
      }}>

      {/* dummy search bar */}
      <TextField
        fullWidth
        placeholder="Search Twitter"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="medium" />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': { borderRadius: 40, bgcolor: '#d3d3d342' },
          '& input': { p: 1 }
        }}
      />

      <Box sx={{ bgcolor: '#d3d3d342', my: 2, width: 1, borderRadius: 5 }}>
        <Box sx={{ px: 2, py: 0.5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Trends for you
          </Typography>
          <IconButton>
            <IoSettingsOutline />
          </IconButton>
        </Box>

        {trends.map(({ name, tag, tweets }, idx) => (
          <Box
            key={idx}
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:hover': { bgcolor: '#d3d3d342' }
            }}>
            <Box>
              <Typography fontSize={13}>{name}</Typography>
              <Typography varaint="h6" fontWeight="bold">
                {tag}
              </Typography>
              <Typography fontSize={13}>{tweets}</Typography>
            </Box>
            <IconButton>
              <RiMoreFill />
            </IconButton>
          </Box>
        ))}
        <Button sx={{ ml: 2 }}>Show more</Button>
      </Box>
    </Box>
  );
};

export default Rightbar;
