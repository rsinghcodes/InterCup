import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';
import Topics from './pages/Topics';

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
      <ScrollToTop />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics/practice/" element={<Topics />} />
          <Route path="/user/accounts/login" element={<Login />} />
          <Route path="/user/accounts/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
