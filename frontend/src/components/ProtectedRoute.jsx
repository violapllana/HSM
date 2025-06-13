// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(storedUser);
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
    return <Navigate to="/login" replace />;
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
