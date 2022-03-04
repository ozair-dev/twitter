// Custom madal made on the top of material UI's model to show login and signup page

import React from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 1, sm: 400 },
  maxHeight: { xs: 1, sm: 0.95 },
  overflowY: 'scroll',
  height: { xs: 1, sm: 'auto' },
  bgcolor: 'background.paper',
  p: 5,
  pt: 1,
  transition: 'all 0.4s',
  borderRadius: { xs: 0, sm: 5 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&  .MuiButton-root': {
    textTransform: 'none',
    borderRadius: 5
  },
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

const AuthModal = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Modal open={true} onClose={closeModal}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={closeModal}
          size="large"
          color="secondary"
          sx={{ position: 'absolute', top: 1, left: 1, borderRadius: 5 }}>
          <CloseIcon fontSize="medium" />
        </IconButton>
        <TwitterIcon fontSize="large" color="primary" />
        {children}
      </Box>
    </Modal>
  );

  function closeModal() {
    navigate('/');
  }
};

export default AuthModal;
