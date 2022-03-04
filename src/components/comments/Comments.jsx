import React, { useState, useContext, useEffect, useRef } from 'react';

import UserContext from '../../providers/UserContext';

import { db } from '../../firebase';
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  limit,
  orderBy,
  updateDoc,
  increment
} from 'firebase/firestore';

import Comment from '../comment';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { AiOutlineSend } from 'react-icons/ai';

const Comments = ({ nestedLevel, parentDoc }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLimit, setCommentsLimit] = useState(5);

  const commentsCollectionRef = useRef();
  const docRef = useRef();

  useEffect(() => {
    docRef.current = parentDoc;
    commentsCollectionRef.current = collection(parentDoc.ref, 'comments');

    const unsub = onSnapshot(
      query(commentsCollectionRef.current, orderBy('timestamp', 'desc'), limit(commentsLimit)),
      (snapshot) => {
        const comments = [];
        snapshot.forEach((doc) => {
          comments.push(doc);
        });
        setComments(comments);
      }
    );
    return unsub;
  }, [commentsLimit]);

  const commentElems = comments.map((doc) => (
    <Comment key={doc.id} document={doc} nestedLevel={nestedLevel} />
  ));

  return (
    <Box sx={{ width: 1, py: 1 }}>
      {/* form to let user post a comment */}
      <Box component="form" onSubmit={addComment} sx={{ display: 'flex', ml: 1 }}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 }, '& input': { py: 1 } }}
        />
        <IconButton type="sumbit" color="primary" variant="contained">
          <AiOutlineSend />
        </IconButton>
      </Box>

      {commentElems}

      {comments.length >= 5 && (
        <Button
          size="small"
          onClick={() => setCommentsLimit((p) => p + 5)}
          sx={{ display: 'block', mx: 'auto' }}>
          Show more
        </Button>
      )}
    </Box>
  );

  async function addComment(e) {
    e.preventDefault();

    // user can make comments only 4 levels deeep
    if (comment.trim() && nestedLevel <= 4) {
      await addDoc(commentsCollectionRef.current, {
        by: user,
        comments: 0,
        likes: [],
        value: comment,
        timestamp: serverTimestamp()
      });

      setComment('');

      await updateDoc(docRef.current.ref, {
        comments: increment(1)
      });
    }
  }
};

export default Comments;
