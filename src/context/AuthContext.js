import React, { useState, useEffect, createContext } from "react";

export const authContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [userImage, setUserImage] = useState(localStorage.getItem("profileImage"));

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken, userImage, setUserImage }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
