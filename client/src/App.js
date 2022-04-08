import { lazy, Suspense } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';
// pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Topics = lazy(() => import('./pages/Topics'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/topics/practice/" element={<Topics />} />
            <Route path="/user/accounts/login" element={<Login />} />
            <Route path="/user/accounts/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
