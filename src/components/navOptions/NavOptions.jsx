import React, { useContext, useState } from 'react';

import {getAuth} from 'firebase/auth'
const auth = getAuth()

import UserContext from '../../providers/UserContext';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import DoneIcon from '@mui/icons-material/Done';
import CheckIcon from '@mui/icons-material/Check';

import { RiMoreFill } from 'react-icons/ri';

const Navoptions = () => {

  const [showingPopup, setShowingPopup] = useState(false)

  const {
    user: { name, photoURL }
  } = useContext(UserContext);
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        width: 1
      }}>
      <Box
        onClick={()=>setShowingPopup(p=>!p)}

        sx={{
          width: 1,
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 10,
          '&:hover': { backgroundColor: '#dddcdc' }
          }}
        >
        <Box sx={{ flex: 1, width: 0, display: 'flex', alignItems: 'center'}}>
          <Avatar component="span" alt={name} src={photoURL} sx={{ width: 50, height: 50 }} />
          <Typography component="span" ml={2} noWrap={true} fontWeight="medium">
            {name}
          </Typography>
        </Box>
        <RiMoreFill fontSize="large" />
      </Box>

      {/* This appears to show options like logout etc */}
      {
        showingPopup && <Box
        sx={{
          width: 300,
          p: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: "hidden",
          transform: 'translateY(-100%)',
          boxShadow: "0 0 10px lightgray"
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Box sx={{ flex: 1, width: 0, display: 'flex', alignItems: 'center' }}>
            <Avatar component="span" alt={name} src={photoURL} sx={{ width: 60, height: 60 }} />
            <Typography component="span" ml={2} noWrap={true} fontWeight="medium">
              {name}
            </Typography>
          </Box>
          <CheckIcon fontSize="medium" color="primary" />
        </Box>
        <Divider />
        <Button variant="secondary" component="span" sx={{width: 1, textAlign: "start"}}>Add an existing account</Button>
        <Button onClick={logout} variant="secondary" component="span" sx={{width: 1}}>Logout</Button>
      </Box>
      }
    </Box>
  );

  function logout(){
    auth.signOut()
  }

};

export default Navoptions;
