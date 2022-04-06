import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5),
  backgroundColor: '#F7E9D7',
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

const HomeCard = ({ heading, children }) => {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Box
          component={Icon}
          icon="ant-design:android-filled"
          width={24}
          height={24}
        />
      </IconWrapperStyle>
      <Typography variant="h6">{heading}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }} mt={2}>
        {children}
      </Typography>
    </RootStyle>
  );
};

export default HomeCard;
