import React from "react";
import { useReduxUser } from "../../utils/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ component }) => {
  // redux
  const reduxUser = useReduxUser();

  if (!reduxUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return component;
};

export default ProtectedRoutes;
