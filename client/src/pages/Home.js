import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeCard from '../components/HomeCard';
// Redux
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';

const Home = () => {
  const { isAuthenticated, user } = useSelector(authSelector);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src="/assets/images/hero-main.png"
            alt="Hero main"
            width="100%"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}
          >
            Prepare for Coding Interviews
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontWeight: 600, display: { xs: 'block', md: 'none' } }}
          >
            Prepare for Coding Interviews
          </Typography>
          <Typography variant="subtitle1" component="h6" mt={2}>
            Most common interview theory questions. Check yourself and prepare
            for upcomming interviews.
          </Typography>
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
              boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
            }}
            component={RouterLink}
            to={
              isAuthenticated
                ? user.role === 'admin'
                  ? '/admin/dashboard'
                  : '/dashboard'
                : '/user/accounts/register'
            }
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={{ xs: 5, md: 0 }}
        sx={{ bgcolor: '#FFEEEE', py: 4, px: 2 }}
      >
        <Typography variant="h6" component="h6" mb={1}>
          Start preparing for
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 600,
            display: { xs: 'none', md: 'block' },
            bgcolor: '#F1DDBF',
          }}
        >
          Your Dream Job
        </Typography>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontWeight: 600,
            display: { xs: 'block', md: 'none' },
            bgcolor: '#F1DDBF',
          }}
        >
          Your Dream Job
        </Typography>

        <Typography
          variant="subtitle1"
          component="h6"
          textAlign="center"
          mt={2}
        >
          Take your interview preparation to the next level with completely
          free. Expert selected questions as per your unique interview
          requirements. Take one today or schedule for later!
        </Typography>
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
            boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
          }}
          endIcon={<ArrowForwardIcon />}
          component={RouterLink}
          to="/topics/practice/"
        >
          Practice Interview Questions
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ minHeight: { xs: 'auto', lg: '80vh' }, mt: { xs: 5, lg: 0 } }}
      >
        <Grid container justifyContent="center" alignItems="center" gap={4}>
          <Grid item xs={12} md={3}>
            <HomeCard heading="Practice quizzes">
              Practice quizzes and share with friends.
            </HomeCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <HomeCard heading="Interviewer's Favorite questions">
              Practice the most Favorite questions asked by the interviewer.
            </HomeCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <HomeCard heading="Complete Interview Questions">
              Be prepared for all types of questions.
            </HomeCard>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          align="center"
          sx={{
            my: 3,
          }}
        >
          <Link
            variant="h6"
            component={RouterLink}
            to={
              isAuthenticated
                ? user.role === 'admin'
                  ? '/admin/dashboard'
                  : '/dashboard'
                : '/user/accounts/register'
            }
            underline="hover"
          >
            Start Now for Free!
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Home;
