import React, { useEffect } from 'react';
import { Card, CardContent, Stack, Typography, Box, Chip } from '@mui/material';
// components
import Spinner from '../components/Spinner';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteQues, userSelector } from '../redux/reducers/userSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favoritesQues, isLoading } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchFavoriteQues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(favoritesQues);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="1.5rem"
      flexDirection="column"
    >
      <Typography variant="h5" component="h5" fontWeight="600">
        Favorites Questions
      </Typography>
      <Stack spacing={2} mb={2} mt={3}>
        {isLoading ? (
          <Spinner />
        ) : (
          favoritesQues.map((ques, i) => (
            <Card variant="outlined" key={ques._id}>
              <CardContent>
                <Chip
                  label={
                    ques.topic.charAt(0).toUpperCase() + ques.topic.slice(1)
                  }
                  sx={{ mb: 1 }}
                />
                <Typography variant="subtitle1" component="p" fontWeight="600">
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
};

export default Favorites;
