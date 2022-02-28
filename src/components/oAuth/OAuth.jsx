import React, { Component } from 'react';

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.profile	');

import Button from '@mui/material/Button';

import { FcGoogle } from 'react-icons/fc';

class Oauth extends Component {
  render() {
    return (
      <div>
        <Button variant="outlined" startIcon={<FcGoogle />} onClick={handleGoogleSignIn}>
          Continue With Google
        </Button>
      </div>
    );
  }
}

function handleGoogleSignIn() {
  signInWithPopup(auth, provider)
    .then(() => {})
    .catch(() => {});
}

export default Oauth;
