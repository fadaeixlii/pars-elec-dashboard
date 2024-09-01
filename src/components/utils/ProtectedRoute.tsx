import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}
const ProtectedRoutes = (props: ProtectedRoutesProps) => {
  // TODO: Use authentication token
  // const localStorageToken = localStorageHelper.getToken();
  const localStorageToken = true;

  return localStorageToken ? (
    props.children
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
};

export default ProtectedRoutes;
