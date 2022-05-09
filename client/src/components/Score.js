import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { increaseScore } from '../redux/reducers/userSlice';
import { authSelector } from '../redux/reducers/authSlice';

const Score = ({ score, quizzes }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(increaseScore(score));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src="/assets/images/quiz-completed.jpg"
          alt="Quiz completed"
          width={250}
        />
      </Box>
      <Typography
        variant="h5"
        component="h5"
        textAlign="center"
        fontWeight="600"
        color="primary"
        mb={2}
      >
        You have completed the quiz!
      </Typography>
      <Typography variant="subtitle1" component="h6" textAlign="center" my={2}>
        You scored {score} out of {quizzes.length}
      </Typography>
      <Typography variant="subtitle1" component="h6" textAlign="center">
        Thank You!!
      </Typography>
    </>
  );
};

export default Score;
