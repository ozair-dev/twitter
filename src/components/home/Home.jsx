import React, { useEffect, useState } from 'react';

import { db } from '../../firebase';
import { collection, doc, orderBy, limit, onSnapshot, query } from 'firebase/firestore';

import ComposeTweet from '../composeTweet';
import Post from '../post';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { BsStars } from 'react-icons/bs';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsLimit, setPostsLimit] = useState(20);

  useEffect(async () => {

    // querying posts from db
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(postsLimit));

    const unsub = onSnapshot(q, (postsSnapshot) => {
      const latest = [];
      postsSnapshot.forEach((post) => {
        latest.push(post);
      });
      setPosts(latest);
    });

    return unsub;
  }, [postsLimit]);

  return (
    <Box>

      <AppBar
        position="sticky"
        sx={{
          color: 'common.black',
          bgcolor: '#ffffff82',
          backdropFilter: 'blur(1px)',
          p: 1.5,
          boxShadow: 'none',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Typography variant="h6" component="span" fontWeight="bold" width="fit-content">
          Home
        </Typography>
        <IconButton size="medium" sx={{ width: 'fit-content' }}>
          <BsStars />
        </IconButton>

      </AppBar>

      <ComposeTweet />

      {posts.map((post) => (
        <Post key={post.id} document={post} />
      ))}


      {!!posts.length && (
        <Button onClick={() => setPostsLimit((p) => p + 20)} sx={{ display: 'block', mx: 'auto' }}>
          Show more
        </Button>
      )}
    </Box>
  );
};

export default Home;
