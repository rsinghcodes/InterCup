import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
// utils
import RequireAuth from './utils/RequireAuth';
// layouts
import DashboardLayout from './layouts/DashboardLayout';
import AppLayout from './layouts/AppLayout';

// pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Topics = lazy(() => import('./pages/Topics'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Question = lazy(() => import('./pages/Question'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
// Admin
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const ManageUser = lazy(() => import('./pages/Admin/ManageUser'));
const ManageQuestion = lazy(() => import('./pages/Admin/ManageQuestion'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const ManageQuiz = lazy(() => import('./pages/Admin/ManageQuiz'));
const QuizForm = lazy(() => import('./pages/Admin/QuizForm'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/admin',
      element: <RequireAuth component={DashboardLayout} />,
      children: [
        {
          path: 'dashboard',
          element: <RequireAuth component={AdminDashboard} />,
        },
        {
          path: 'manage-users',
          element: <RequireAuth component={ManageUser} />,
        },
        {
          path: 'manage-quizzes',
          element: <RequireAuth component={ManageQuiz} />,
        },
        {
          path: 'manage-questions',
          element: <RequireAuth component={ManageQuestion} />,
        },
        { path: 'quiz/new', element: <RequireAuth component={QuizForm} /> },
      ],
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/user/accounts/login', element: <Login /> },
        { path: '/user/accounts/register', element: <Register /> },
        { path: '/admin/account/login', element: <AdminLogin /> },
        { path: '/topics/practice/', element: <Topics /> },
        { path: '/topics/practice/:topicname/quiz', element: <Quiz /> },
        { path: '/topics/practice/:topicname/theory', element: <Question /> },
        {
          path: '/auth/user/:userId/verify/:tokenId',
          element: <VerifyEmail />,
        },
        {
          path: '/dashboard',
          element: <RequireAuth component={Dashboard} />,
        },
        {
          path: '/user/profile',
          element: <RequireAuth component={Profile} />,
        },
        {
          path: '/user/edit-profile',
          element: <RequireAuth component={EditProfile} />,
        },
        {
          path: '/user/favorites',
          element: <RequireAuth component={Favorites} />,
        },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
