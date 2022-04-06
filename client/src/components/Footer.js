import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#3A3845',
        color: '#fff',
        p: { xs: 2, md: 4, lg: 10 },
        mt: { xs: 3, lg: 0 },
      }}
      width="100%"
    >
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
      >
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'block', fontWeight: 600 }}
          >
            InterCup
          </Typography>
          <Typography variant="subtitle1" component="h6" mt={1}>
            InterCup is an interview preparation platform, where users can check
            their knowledge on a specific topic.
          </Typography>
          <Box mt={2}>
            <Box
              component={Icon}
              icon="entypo-social:facebook"
              sx={{ fontSize: '1.5rem' }}
            />
            <Box
              component={Icon}
              icon="entypo-social:twitter"
              sx={{ fontSize: '1.5rem', ml: '1.5rem' }}
            />
            <Box
              component={Icon}
              icon="entypo-social:github"
              sx={{ fontSize: '1.5rem', ml: '1.5rem' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} pl={{ xs: '0rem', lg: '3rem' }}>
          <Link
            variant="subtitle1"
            component={RouterLink}
            to="/"
            underline="hover"
            display="block"
            color="white"
            mb={1}
          >
            Home
          </Link>
          <Link
            variant="subtitle1"
            component={RouterLink}
            to="/topics/practice/"
            underline="hover"
            display="block"
            color="white"
            mb={1}
          >
            Interview Questions
          </Link>
          <Link
            variant="subtitle1"
            component={RouterLink}
            to="/topics/practice/"
            underline="hover"
            display="block"
            color="white"
            mb={1}
          >
            Quizzes
          </Link>
          <Link
            variant="subtitle1"
            component={RouterLink}
            to="/"
            underline="hover"
            display="block"
            color="white"
          >
            FAQs
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
