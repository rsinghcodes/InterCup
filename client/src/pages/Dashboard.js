import React, { useEffect } from 'react';
import { Box, Chip, Divider, Typography } from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, userSelector } from '../redux/reducers/userSlice';

import Topics from './Topics';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="1.5rem"
        flexDirection="column"
      >
        <Typography variant="h5" component="h5" fontWeight="600">
          Welcome, {user.fullname}
        </Typography>
        <Box textAlign="center">
          <Chip
            label={`Global Rank: ${user.global_rank}`}
            color="primary"
            sx={{ my: '1rem', mr: '0.5rem' }}
          />
          <Chip label="Highest Score: 487" color="primary" variant="outlined" />
        </Box>
      </Box>
      <Divider />
      <Topics />
    </>
  );
};

export default Dashboard;
