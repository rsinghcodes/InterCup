import {
  Button,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Header from './components/Header';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Public Sans', 'sans-serif'].join(','),
    },
    palette: {
      primary: { main: '#0070F3' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
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
            <Typography variant="h6" component="h6" mt={2}>
              Most common interview theory questions. Check yourself and prepare
              for upcomming interviews.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disableRipple
              sx={{
                px: { xs: 6, sm: 8 },
                py: { xs: 1, sm: 1.5 },
                mt: 3,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                textTransform: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
