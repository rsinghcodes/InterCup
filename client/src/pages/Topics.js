import React from 'react';
import { Box, Grid } from '@mui/material';

import CustomCard from '../components/CustomCard';

const Topics = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ py: 5 }}
    >
      <Grid container justifyContent="center" alignItems="center" gap={4}>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName="JavaScript"
            quizLink="/topics/practice/javascript/quiz"
            theoryLink="/topics/practice/javascript/theory"
          >
            Practice JavaScript quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName="Python"
            quizLink="/topics/practice/python/quiz"
            theoryLink="/topics/practice/python/theory"
          >
            Practice Python quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName={`Reactjs`}
            quizLink="/topics/practice/reactjs/quiz"
            theoryLink="/topics/practice/reactjs/theory"
          >
            Practice Reactjs quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName={`Java`}
            quizLink="/topics/practice/java/quiz"
            theoryLink="/topics/practice/java/theory"
          >
            Practice Java quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName={`C++`}
            quizLink="/topics/practice/c-plus-plus/quiz"
            theoryLink="/topics/practice/c-plus-plus/theory"
          >
            Practice C++ quizzes and theory question
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomCard
            topicName={`Nodejs`}
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
