import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Container, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';

import LoginForm from '../components/LoginForm';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const { isError, error } = useSelector(authSelector);

  useEffect(() => {
    if (isError && error.message) {
      toast.error(error.message, { duration: 2500 });
    }
  }, [isError, error]);

  return (
    <Box display="flex">
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }} elevation={0}>
        <img src="/assets/images/illustration_login.png" alt="login" />
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to your account
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Stack>

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
            }}
          >
            Don't have an account?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="/user/accounts/register"
              underline="hover"
            >
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Box>
  );
};

export default Login;
