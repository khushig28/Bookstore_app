// protectedRoutes.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './helper/context/authContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
