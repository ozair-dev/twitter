import React, { useContext, useState, useEffect } from 'react';

import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const storage = getStorage();

import UserContext from '../../providers/UserContext';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { IoImageOutline } from 'react-icons/io5';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { BsEmojiSmile } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const ComposeTweet = () => {
  const { user } = useContext(UserContext);

  const [tweet, setTweet] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Box sx={{ px: 1.5, pb: 1, display: 'flex', borderBottom: 1, borderColor: 'secondary.light' }}>
      {user.photoURL ? (
        <Avatar alt={user.name} src={user.photoURL} sx={{ width: 55, height: 55 }} />
      ) : (
        <Avatar sx={{ width: 55, height: 55 }}>{user.name}</Avatar>
      )}
      <Box sx={{ width: 1, ml: 1 }}>
        <Input
          multiline
          fullWidth
          placeholder="What's Happening?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          sx={{
            border: 'none',
            fontSize: 20,
            '&:before': { border: 'none' },
            '&:after': { border: 'none' },
            '&:hover:not(.Mui-disabled):before': {
              border: 'none'
            }
          }}
        />
        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <label htmlFor="images-input">
              <input
                multiple
                type="file"
                onChange={handleImagesInput}
                id="images-input"
                accept="image/*"
                style={{ display: 'none' }}
              />
              <IconButton component="span" size="medium" color="primary">
                <IoImageOutline />
              </IconButton>
            </label>

            <IconButton size="medium" color="primary">
              <AiOutlineFileGif />
            </IconButton>

            <IconButton
              size="medium"
              color="primary"
              sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <BiPoll />
            </IconButton>

            <IconButton
              size="medium"
              color="primary"
              sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <BsEmojiSmile />
            </IconButton>

            <IconButton
              size="medium"
              color="primary"
              sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <CalendarTodayIcon />
            </IconButton>

            <IconButton
              size="medium"
              color="primary"
              sx={{ display: { xs: 'none', sx: 'initial' } }}>
              <HiOutlineLocationMarker />
            </IconButton>
          </Box>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant="contained"
            sx={{ borderRadius: 5 }}>
            Tweet
          </Button>
        </Box>
        {images.map((image, idx) => (
          <Box
            key={idx}
            sx={{
              p: 0.5,
              my: 0.5,
              borderRadius: 2,
              backgroundColor: 'secondary.light',
              width: 1,
              display: 'flex',
              alignItems: 'center',
              '& img': { width: 20, height: 20 }
            }}>
            <img src={image.url} alt={image.name} />
            <Typography sx={{ width: 0, flex: 1, ml: 1 }} noWrap={true}>
              {image.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  function handleImagesInput(e) {
    setLoading(true);
    let files = [...e.target.files];
    files.forEach((file, index) => {
      const storageRef = ref(storage, 'images/' + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        null,
        () => {
          alert('An image could not be uploaded');
          if (!files[index + 1]) setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages((prev) => [...prev, { name: file.name, url: downloadURL }]);
            if (!files[index + 1]) setLoading(false);
          });
        }
      );
    });
  }

  async function handleSubmit() {
    if (tweet || images.length) {
      const imagesSrcs = images.map((img) => img.url);
      setLoading(true);
      const postRef = await addDoc(collection(db, 'posts'), {
        tweet: tweet || undefined,
        images: imagesSrcs,
        timestamp: serverTimestamp(),
        by: user,
        likes: [],
        comments: 0
      });
      setLoading(false);
      setTweet('');
      setImages([]);
    }
  }
};

export default ComposeTweet;
