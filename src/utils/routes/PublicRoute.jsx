import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, restricted }) => {
  return !restricted ? children : <Navigate to="/surf" />;
};

export default PublicRoute;
