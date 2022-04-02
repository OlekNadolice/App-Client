import { useContext } from "react";
import { authContext } from "context/AuthContext";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useContext(authContext);
  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};
