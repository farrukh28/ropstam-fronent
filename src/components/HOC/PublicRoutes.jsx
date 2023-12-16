import React from "react";
import { useReduxUser } from "../../utils/hooks";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ component }) => {
  // redux
  const reduxUser = useReduxUser();

  if (reduxUser) {
    return <Navigate replace to="/" />;
  }

  return component;
};

export default PublicRoutes;
