import React, { useContext, useState } from 'react';

import UserContext from '../../providers/UserContext';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const auth = getAuth();

import { getStorage, ref as fRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const storage = getStorage();

import AuthModal from '../authModal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Controller, useForm } from 'react-hook-form';

import { object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const signUpSchema = object({
  name: string()
    .required('Name is required')
    .max(50, "Name's length should not be more than 50 characters"),
  email: string()
    .lowercase()
    .email('Must be a valid email address')
    .required('Email address is required'),
  password: string().min(6, 'Must be atleast 6 characters long').required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Please re-enter the password')
}).required();

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [signUpErrors, setSignUpErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }
  });

  return (
    <AuthModal>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mt={3}>
          Create your account
        </Typography>

        <Box
          sx={{
            mx: 'auto',
            my: 2,
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: 1,
            borderColor: 'primary.main',
            position: 'relative'
          }}>
          {!!imageUrl && (
            <img src={imageUrl} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          )}

          <label htmlFor="image-input">
            <input
              accept="image/*"
              id="image-input"
              onChange={handleImageSelect}
              type="file"
              style={{ display: 'none' }}
            />
            <LoadingButton
              component="span"
              variant="contained"
              color="primary"
              loading={loading}
              sx={{
                p: 1,
                minWidth: 0,
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(-50%, -50%)'
              }}>
              <CameraAltIcon sx={{ color: 'gray[50]' }} />
            </LoadingButton>
          </label>
        </Box>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              fullWidth
              variant="outlined"
              color="primary"
              margin="dense"
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              color="primary"
              margin="dense"
              label="Email"
              error={!!errors.email || !!signUpErrors.email}
              helperText={errors.email?.message || signUpErrors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              color="primary"
              margin="dense"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              color="primary"
              margin="dense"
              label="Confirm Password"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <Button variant="contained" disabled={loading} type="submit" sx={{ width: 300, mt: 2 }}>
          Sign up
        </Button>
      </Box>
    </AuthModal>
  );

  function onSubmit({ email, password, name }) {
    setLoading(true);
    setSignUpErrors({});
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        updateProfile(user, {
          displayName: name,
          photoURL: imageUrl
        }).then(() => {
          setUser(auth.currentUser);
        });
      })
      .catch((err) => {
        setLoading(false);
        switch (err.code) {
          case 'auth/invalid-email':
            setSignUpErrors({ email: { message: 'Invalid email address' } });
            break;
          case 'auth/email-already-in-use':
            setSignUpErrors({ email: { message: 'Email address is already in use' } });
            break;
        }
      });
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];

    if (file && file.type.includes('image')) {
      setImageUrl('');
      setLoading(true);
      const storageRef = fRef(storage, 'images/' + file.name);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',

        // getting events like, progress
        (snapshot) => {
          console.log((100 * snapshot.bytesTransferred) / snapshot.totalBytes);
        },

        // handeling errors
        (e) => {
          setLoading(false);
          console.log(e);
        },

        // success function
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
          });
          setLoading(false);
        }
      );
    }
  }
};

export default Signup;
