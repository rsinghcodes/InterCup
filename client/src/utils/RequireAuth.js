import React from 'react';
import { Navigate } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';

const RequireAuth = ({ component: RouteComponent }) => {
  const { isAuthenticated } = useSelector(authSelector);

  return isAuthenticated ? (
    <RouteComponent />
  ) : (
    <Navigate to="/user/accounts/login" replace />
  );
};

export default RequireAuth;
