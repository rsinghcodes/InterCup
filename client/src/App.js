import { lazy, Suspense } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ErrorBoundary } from 'react-error-boundary';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';
import ErrorFallback from './components/ErrorFallback';
// utils
import RequireAuth from './utils/RequireAuth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { store } from './redux/store';
import { logout, setCurrentUser } from './redux/reducers/authSlice';
import { getProfile } from './redux/reducers/userSlice';
// pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Topics = lazy(() => import('./pages/Topics'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Question = lazy(() => import('./pages/Question'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
// Admin
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const ManageUser = lazy(() => import('./pages/Admin/ManageUser'));
const ManageQuestion = lazy(() => import('./pages/Admin/ManageQuestion'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const ManageQuiz = lazy(() => import('./pages/Admin/ManageQuiz'));
const QuizForm = lazy(() => import('./pages/Admin/QuizForm'));

if (localStorage.token) {
  const token = localStorage.token;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getProfile());

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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                <Route path="/user/edit-profile" element={<EditProfile />} />
              </Route>
              <Route path="/topics/practice/" element={<Topics />} />
              <Route path="/user/accounts/login" element={<Login />} />
              <Route path="/user/accounts/register" element={<Register />} />
              <Route
                path="/topics/practice/:topicname/quiz"
                element={<Quiz />}
              />
              <Route
                path="/topics/practice/:topicname/theory"
                element={<Question />}
              />

              <Route path="/admin/account/login" element={<AdminLogin />} />
              <Route element={<RequireAuth />}>
                <Route path="/admin/manage-users" element={<ManageUser />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route
                  path="/admin/manage-questions"
                  element={<ManageQuestion />}
                />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/admin/manage-quizzes" element={<ManageQuiz />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/admin/quiz/new" element={<QuizForm />} />
              </Route>
            </Routes>
          </Suspense>
        </Container>
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
