import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// components
import Spinner from '../components/Spinner';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  likeQues,
  questionSelector,
  unlikeQues,
} from '../redux/reducers/questionSlice';
import { authSelector } from '../redux/reducers/authSlice';
import {
  addFavoriteQues,
  removeFavoriteQues,
  userSelector,
} from '../redux/reducers/userSlice';

export default function Question() {
  const { topicname } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { isAuthenticated } = useSelector(authSelector);
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
          <Spinner />
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
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    mt={2}
                  >
                    {isAuthenticated ? (
                      ques.likes.includes(user._id) ? (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ThumbUpAltIcon />}
                          disableElevation
                          sx={{ textTransform: 'none', mr: 2 }}
                          onClick={() => dispatch(unlikeQues(ques._id))}
                        >
                          {ques.likes.length}
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ThumbUpOffAltIcon />}
                          disableElevation
                          sx={{ textTransform: 'none', mr: 2 }}
                          onClick={() => dispatch(likeQues(ques._id))}
                        >
                          {ques.likes.length}
                        </Button>
                      )
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ThumbUpOffAltIcon />}
                        disableElevation
                        sx={{ textTransform: 'none', mr: 2 }}
                        onClick={() => alert('Please login...')}
                      >
                        {ques.likes.length}
                      </Button>
                    )}
                    {isAuthenticated ? (
                      user.favorites.includes(ques._id) ? (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<FavoriteIcon />}
                          sx={{ textTransform: 'none' }}
                          onClick={() => dispatch(removeFavoriteQues(ques._id))}
                        >
                          Remove from favorite
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<FavoriteBorderIcon />}
                          sx={{ textTransform: 'none' }}
                          onClick={() => dispatch(addFavoriteQues(ques._id))}
                        >
                          Add to favorite
                        </Button>
                      )
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FavoriteBorderIcon />}
                        sx={{ textTransform: 'none' }}
                        onClick={() =>
                          alert('Please login to add in your favorite list...')
                        }
                      >
                        Add to favorite
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))
        )}
      </Stack>
    </Box>
  );
}
