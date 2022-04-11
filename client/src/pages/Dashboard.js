import React from 'react';
import { Box, Chip, Divider, Typography } from '@mui/material';
// Redux
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducers/authSlice';

const Dashboard = () => {
  const { user } = useSelector(userSelector);

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
            label="Global Rank: 2545"
            color="primary"
            sx={{ my: '1rem', mr: '0.5rem' }}
          />
          <Chip label="Highest Score: 487" color="primary" variant="outlined" />
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="1.5rem"
        flexDirection="column"
      ></Box>
    </>
  );
};

export default Dashboard;
