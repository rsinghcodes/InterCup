import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// Redux
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';

import RegisterForm from '../components/RegisterForm';

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

// ----------------------------------------------------------------------

export default function Register() {
  const { message, isSuccess } = useSelector(authSelector);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, { duration: 2500 });
    }
  }, [isSuccess, message]);

  return (
    <Box display="flex">
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }} elevation={0}>
        <img alt="register" src="/assets/images/illustration_login.png" />
      </SectionStyle>
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Register free forever.
            </Typography>
          </Box>

          <RegisterForm />

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
            }}
          >
            Already have an account?&nbsp;
            <Link
              underline="hover"
              to="/user/accounts/login"
              component={RouterLink}
            >
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Box>
  );
}
