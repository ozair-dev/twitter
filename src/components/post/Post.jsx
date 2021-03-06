import React, { useRef, useState, useEffect, useContext } from 'react';

import UserContext from '../../providers/UserContext';

import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import Comments from '../comments';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { pink, lightBlue, green, grey } from '@mui/material/colors';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineRetweet, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { FiShare } from 'react-icons/fi';
import { RiMoreFill } from 'react-icons/ri';

const Post = ({ document }) => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(document);
  const imagesDivRef = useRef(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showingComments, setShowingComments] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'posts', post.id), (p) => {
      setPost(p);
    });
    return unsub;
  }, []);

  useEffect(() => {
    setLiked(post.data().likes.includes(user.id));
  }, [post]);

  useEffect(() => {
    if (imagesDivRef.current) {
      const { width } = imagesDivRef.current.getBoundingClientRect();
      imagesDivRef.current.scroll({ left: width * imgIdx, behavior: 'smooth' });
    }
  }, [imgIdx]);

  const {
    by: { photoURL, name },
    images,
    tweet,
    likes,
    comments: commentsCount
  } = post.data();

  return (
    <Box sx={{ display: 'flex', p: 1.5, pb: 0.5, borderBottom: 1, borderColor: 'secondary.light' }}>
      {photoURL ? (
        <Avatar alt="name" src={photoURL} sx={{ width: 55, height: 55 }} />
      ) : (
        <Avatar sx={{ width: 55, height: 55 }}>{name}</Avatar>
      )}

      <Box sx={{ pl: 1, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography varaint="h6" fontWeight="bold">
            {name}
          </Typography>
          <IconButton onClick={handleDelete}>
            <RiMoreFill />
          </IconButton>
        </Box>
        <Typography whiteSpace={'pre-line'}>{tweet}</Typography>

        {/* This box contains images and the buttons to slide the images */}
        {!!images.length && (
          <Box sx={{ position: 'relative', mt: 1 }}>
            <Box
              ref={imagesDivRef}
              sx={{
                width: 1,
                minHeight: 60,
                display: 'grid',
                gridTemplateColumns: `repeat(${images.length}, 100%)`,
                overflow: 'hidden',
                '& button': {
                  color: 'white',
                  bgcolor: 'common.black',
                  opacity: '0.4'
                },
                '& button:hover': {
                  bgcolor: 'common.black'
                }
              }}>
              {images.map((src, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 1,
                    maxHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& img': {
                      maxWidth: 1,
                      maxHeight: 1,
                      borderRadius: 3
                    }
                  }}>
                  <img alt="image" src={src} lazy="true" />
                </Box>
              ))}

              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={() => handleImageSlide('-')}
                    sx={{ position: 'absolute', top: '50%', left: 0 }}>
                    <AiOutlineLeft />
                  </IconButton>

                  <IconButton
                    onClick={() => handleImageSlide('+')}
                    sx={{ position: 'absolute', top: '50%', right: 0 }}>
                    <AiOutlineRight />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        )}

        {/* post action buttons such as like, comment and retweet */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 1,
            '& .MuiButton-root': { borderRadius: 5 }
          }}>
          <Button
            onClick={() => setShowingComments((p) => !p)}
            startIcon={<BiMessageRounded />}
            sx={{
              color: grey.A700,
              '&:hover': {
                color: lightBlue.A400,
                bgolor: lightBlue[50]
              }
            }}>
            {commentsCount}
          </Button>

          <Button
            startIcon={<AiOutlineRetweet />}
            sx={{
              color: grey.A700,
              '&:hover': {
                color: green.A400,
                bgolor: green[50]
              }
            }}></Button>

          <Button
            onClick={handleLike}
            startIcon={<AiOutlineHeart />}
            sx={[
              {
                color: grey.A700,
                '&:hover': {
                  color: pink.A200,
                  bgolor: pink[50]
                }
              },
              liked && {
                color: pink.A200
              }
            ]}>
            {likes.length}
          </Button>

          <Button
            startIcon={<FiShare />}
            sx={{
              display: { xs: 'none', sm: 'initial' },
              color: grey.A700,
              '&:hover': {
                color: lightBlue.A400,
                bgolor: lightBlue[50]
              }
            }}></Button>
        </Box>

        {/* Nested level is used to know how deep comments are so we can limit how many levels deep users can make comments */}
        {showingComments && <Comments nestedLevel={1} parentDoc={post} />}
      </Box>
    </Box>
  );

  function handleImageSlide(op) {
    switch (op) {
      case '+':
        if (images[imgIdx + 1]) setImgIdx((idx) => idx + 1);
        else setImgIdx(0);
        break;
      case '-':
        if (images[imgIdx - 1]) setImgIdx((idx) => idx - 1);
        else setImgIdx(images.length - 1);
        break;
    }
  }

  async function handleLike() {
    if (liked) {
      setLiked(false);
      await updateDoc(doc(db, 'posts', post.id), {
        likes: arrayRemove(user.id)
      });
    } else {
      setLiked(true);
      await updateDoc(doc(db, 'posts', post.id), {
        likes: arrayUnion(user.id)
      });
    }
  }

  async function handleDelete() {
    if (user.id === 'cn63Rll8VBMWAqhLzhnzrbVYRxp1') {
      await deleteDoc(doc(db, 'posts', post.id));
    }
  }
};

export default Post;
