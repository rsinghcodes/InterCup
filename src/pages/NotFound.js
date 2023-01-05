import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="90vh"
    >
      <img alt="aa" src="/assets/images/NotFound.png" width={250} />
      <Typography variant="h3" component="h3" my={3} fontWeight={600}>
        404
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        width={{ xs: 'auto', md: '500px' }}
        textAlign="center"
      >
        The page you are looking for could not be found. It might have been
        removed, renamed, or did not exist in the first place.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disableRipple
        sx={{
          px: 4,
          py: 1,
          mt: 3,
          fontSize: { xs: '0.8rem', lg: '1rem' },
          textTransform: 'none',
          borderRadius: '5px',
        }}
        endIcon={<HomeIcon />}
        component={Link}
        to="/"
      >
        Return Home
      </Button>
    </Box>
  );
};

export default NotFound;
