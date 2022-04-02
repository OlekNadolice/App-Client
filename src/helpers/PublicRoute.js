import { useContext } from "react";
import { authContext } from "context/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useContext(authContext);
  if (!isLoggedIn) {
    return element;
  } else {
    return <Navigate to="/home" />;
  }
};
