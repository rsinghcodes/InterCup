import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import CustomCard from '../components/CustomCard';
import { useDispatch } from 'react-redux';
import { fetchQuizzes } from '../redux/reducers/quizSlice';

const Topics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ py: 5 }}
    >
      <Grid container justifyContent="center" alignItems="center" gap={4}>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="logos:javascript"
            quizLink="/topics/practice/javascript/quiz"
            theoryLink="/topics/practice/javascript/theory"
          >
            Practice JavaScript quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="vscode-icons:file-type-python"
            quizLink="/topics/practice/python/quiz"
            theoryLink="/topics/practice/python/theory"
          >
            Practice Python quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="vscode-icons:file-type-reactjs"
            quizLink="/topics/practice/reactjs/quiz"
            theoryLink="/topics/practice/reactjs/theory"
          >
            Practice Reactjs quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="logos:java"
            quizLink="/topics/practice/java/quiz"
            theoryLink="/topics/practice/java/theory"
          >
            Practice Java quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="logos:c-plusplus"
            quizLink="/topics/practice/c-plus-plus/quiz"
            theoryLink="/topics/practice/c-plus-plus/theory"
          >
            Practice C++ quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <CustomCard
            icon="logos:nodejs-icon"
            quizLink="/topics/practice/nodejs/quiz"
            theoryLink="/topics/practice/nodejs/theory"
          >
            Practice Nodejs quizzes and theory question
          </CustomCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Topics;
