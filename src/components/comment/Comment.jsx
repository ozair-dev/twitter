import React, { useState, useEffect, useContext, useRef } from 'react';

import UserContext from '../../providers/UserContext';

import { db } from '../../firebase';

import { onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import Comments from '../comments';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { green, lightBlue, pink, grey } from '@mui/material/colors';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';

import { FiShare } from 'react-icons/fi';

const Comment = ({ document, nestedLevel, parentCollectionPath }) => {
  const [comment, setComment] = useState(document);
  const [showingComments, setShowingComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const docRef = useRef();
  const { user } = useContext(UserContext);

  const {
    value,
    likes,
    comments: commentsCount,
    by: { photoURL, name }
  } = comment.data();

  useEffect(() => {
    docRef.current = document;
    const unsub = onSnapshot(docRef.current.ref, (doc) => {
      setComment(doc);
    });
    return unsub;
  }, []);

  useEffect(() => {
    setLiked(comment.data().likes.includes(user.id));
  }, [comment]);

  return (
    <Box sx={{ width: 1, my: 1, display: 'flex', justifyContent: 'end', position: 'relative' }}>
      <Box
        sx={{
          width: 0.9,
          pb: 1,
          border: 1,
          borderRadius: 2,
          borderColor: '#d3d3d342',
          overflow: 'hidden',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '5%',
            right: '90%',
            bottom: '10%',
            borderLeft: 2,
            borderBottom: 2,
            borderBottomLeftRadius: 50,
            borderColor: 'secondary.light'
          }
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: '#d3d3d342' }}>
          {photoURL ? <Avatar alt={name} src={photoURL} /> : <Avatar>{name}</Avatar>}
          <Typography fontWeight="medium" sx={{ ml: 1 }}>
            {name}
          </Typography>
        </Box>

        <Typography sx={{ p: 1 }}>{value}</Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            '& .MuiButton-root': {
              borderRadius: 5
            }
          }}>
          <Button
            onClick={() => setShowingComments((p) => !p)}
            startIcon={<BiMessageRounded />}
            sx={{
              color: grey.A700,
              '&:hover': {
                color: lightBlue.A400,
                bgcolor: lightBlue[50]
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
                bgcolor: green[50]
              }
            }}></Button>
          <Button
            onClick={handleLike}
            startIcon={<AiOutlineHeart />}
            sx={[
              {
                color: grey.A700,
                '&:hover': {
                  color: pink.A400,
                  bgcolor: pink[50]
                }
              },
              liked && {
                color: pink.A400
              }
            ]}>
            {likes.length}
          </Button>
          <Button
            startIcon={<FiShare />}
            sx={{
              color: grey.A700,
              '&:hover': {
                color: lightBlue.A400,
                bgcolor: lightBlue[50]
              }
            }}></Button>
        </Box>
        {showingComments && <Comments parentDoc={docRef.current} nestedLevel={nestedLevel + 1} />}
      </Box>
    </Box>
  );

  async function handleLike() {
    if (liked) {
      setLiked(false);
      await updateDoc(docRef.current.ref, {
        likes: arrayRemove(user.id)
      });
    } else {
      setLiked(true);
      await updateDoc(docRef.current.ref, {
        likes: arrayUnion(user.id)
      });
    }
  }
};

export default Comment;
