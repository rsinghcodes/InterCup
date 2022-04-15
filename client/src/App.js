import { lazy, Suspense } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';
// utils
import RequireAuth from './utils/RequireAuth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { store } from './redux/store';
import { logout, setCurrentUser } from './redux/reducers/authSlice';
// pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Topics = lazy(() => import('./pages/Topics'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));

if (localStorage.token) {
  const token = localStorage.token;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = './';
  }
}

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Public Sans', 'sans-serif'].join(','),
    },
    palette: {
      primary: { main: '#0070F3' },
      secondary: { main: '#FD5D5D' },
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
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route
                path="/user/update-password"
                element={<UpdatePassword />}
              />
            </Route>
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
