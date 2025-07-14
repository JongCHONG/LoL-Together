import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default PrivateRoute;
