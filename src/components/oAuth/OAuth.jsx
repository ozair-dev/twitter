import React, { Component } from 'react';

import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'

const auth = getAuth();
const  provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.profile	');


import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import {FcGoogle} from 'react-icons/fc'

class Oauth extends Component {
  render() {
    return (
      <div>
        <Button
        variant="outlined"
        startIcon={<FcGoogle />}
        onClick={handleGoogleSignIn}

      >
        Continue With Google
      </Button>
      </div>
    );
  }
}

function handleGoogleSignIn(){
  signInWithPopup(auth, provider)
  .then(result=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

export default Oauth;
