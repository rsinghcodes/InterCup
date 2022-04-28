import { Box, Button, Typography } from '@mui/material';

export default function ErrorFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <img alt="aa" src="/assets/images/SomethingWentWrong.png" width={250} />
      <Typography variant="h6" component="h6" mb={2} mt={4}>
        Something went wrong : (
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disableRipple
        sx={{
          px: 4,
          py: 1,
          mt: 1,
          fontSize: { xs: '0.8rem', lg: '1rem' },
          textTransform: 'none',
          borderRadius: '5px',
        }}
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh page
      </Button>
    </Box>
  );
}
