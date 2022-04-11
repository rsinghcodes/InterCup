import React from 'react';
import { Navigate } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducers/authSlice';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(userSelector);

  return isAuthenticated ? children : <Navigate to="/user/accounts/login" />;
};

export default PrivateRoute;
