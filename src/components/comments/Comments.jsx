import React, { useState, useContext, useEffect } from 'react';

import userContext from '../../providers/UserContext';

import { db } from '../../firebase';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { AiOutlineSend } from 'react-icons/ai';

const Comments = ({ post }) => {
  const { user } = useContext(userContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {}, []);

  return (
    <Box sx={{ width: 1, py: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 }, '& input': { py: 1 } }}
        />
        <IconButton onClick={addComment} color="primary" variant="contained">
          <AiOutlineSend />
        </IconButton>
      </Box>
    </Box>
  );

  async function addComment() {
    await addDoc(collection(db, 'posts', post.id, 'comments'), {
      by: user,
      comments: 0,
      likes: [],
      comment: comment
    });
    console.log('comment added');
    setComment('');
  }
};

export default Comments;
