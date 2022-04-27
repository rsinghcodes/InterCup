import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Card, CardContent, Stack, Typography } from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  questionSelector,
} from '../redux/reducers/questionSlice';

export default function Question() {
  const { topicname } = useParams();
  const dispatch = useDispatch();
  const { questions, isLoading } = useSelector(questionSelector);

  useEffect(() => {
    dispatch(fetchQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="1.5rem"
      flexDirection="column"
    >
      <Typography variant="h5" component="h5" fontWeight="600">
        {topicname.charAt(0).toUpperCase() + topicname.slice(1)} Interview
        Questions
      </Typography>
      <Stack spacing={2} mb={2} mt={3}>
        {isLoading ? (
          <Typography variant="subtitle1" component="p">
            Please wait..., Questions loading...
          </Typography>
        ) : (
          questions
            .filter((x) => topicname === x.topic)
            .map((ques, i) => (
              <Card variant="outlined" key={i}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    fontWeight="600"
                  >
                    {'Q. ' + (i + 1) + ': ' + ques.question}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    <span style={{ fontWeight: '600' }}>Answer:</span>{' '}
                    {ques.answer}
                  </Typography>
                </CardContent>
              </Card>
            ))
        )}
      </Stack>
    </Box>
  );
}
