import React from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Link, Typography } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5),
  backgroundColor: '#F7E9D7',
}));

const CustomCard = ({ topicName, children, quizLink, theoryLink }) => {
  return (
    <RootStyle>
      <Typography variant="h6">{topicName}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }} mt={2}>
        {children}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 2,
        }}
      >
        <Link
          variant="subtitle2"
          component={RouterLink}
          to={quizLink}
          underline="hover"
        >
          Practice Quiz
        </Link>
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 1,
        }}
      >
        <Link
          variant="subtitle2"
          component={RouterLink}
          to={theoryLink}
          underline="hover"
        >
          View Interview Questions
        </Link>
      </Typography>
    </RootStyle>
  );
};

export default CustomCard;
