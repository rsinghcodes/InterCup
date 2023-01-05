import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, verifyUserEmail } from '../redux/reducers/authSlice';

const VerifyEmail = () => {
  const { userId, tokenId } = useParams();
  const dispatch = useDispatch();
  const { isSuccess, message, isError, error } = useSelector(authSelector);

  useEffect(() => {
    dispatch(verifyUserEmail({ userId, tokenId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="1.5rem"
      flexDirection="column"
      my={6}
    >
      {isSuccess && (
        <>
          <img
            alt="verify email"
            src="/assets/images/verifiedEmail.png"
            width={320}
          />
          <Typography variant="h5" component="h5" mt={4} mb={3}>
            {message.message}
          </Typography>
        </>
      )}
      {isError && (
        <>
          <img
            alt="verify email"
            src="/assets/images/bad_gateway.png"
            width={350}
          />
          <Typography variant="subtitle1" component="p" mt={5} color="error">
            Bad Gateway!
          </Typography>
          <Typography variant="h6" component="h6" mt={1} color="error">
            {error.error}
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        disableElevation
        disableRipple
        sx={{
          px: 6,
          py: 1,
          mt: 3,
          fontSize: { xs: '0.8rem', lg: '1rem' },
          textTransform: 'none',
          borderRadius: '8px',
        }}
        component={Link}
        to="/user/accounts/login"
      >
        Back to Login
      </Button>
    </Box>
  );
};

export default VerifyEmail;
