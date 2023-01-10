import { Suspense, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
// routes
import Router from './routes';
// theme
import palette from './theme/palette';
import shadows from './theme/shadows';
// components
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';
import ErrorFallback from './components/ErrorFallback';
// utils
import setAuthToken from './utils/setAuthToken';
// Redux
import { store } from './redux/store';
import { logout, setCurrentUser } from './redux/reducers/authSlice';
import { getAdminProfile, getProfile } from './redux/reducers/userSlice';

if (localStorage.token) {
  const token = localStorage.token;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  if (decoded.role === 'admin') {
    store.dispatch(getAdminProfile());
  } else {
    store.dispatch(getProfile());
  }

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = './';
  }
}

function App() {
  const themeOptions = useMemo(
    () => ({
      palette,
      shadows,
      shape: { borderRadius: 8 },
      typography: {
        fontFamily: ['Public Sans', 'sans-serif'].join(','),
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ScrollToTop />
        <Toaster
          toastOptions={{
            style: {
              fontFamily: ['Public Sans', 'sans-serif'].join(','),
            },
          }}
        />
        <Suspense fallback={<Spinner />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
