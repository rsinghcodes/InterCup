import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';

const RequireAuth = () => {
  const { isAuthenticated } = useSelector(authSelector);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/user/accounts/login" replace />
  );
};

export default RequireAuth;
