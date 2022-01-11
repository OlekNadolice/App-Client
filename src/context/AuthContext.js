import React, { useState, useEffect, createContext } from "react";

export const authContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(localStorage.getItem("profileImage"));

  useEffect(() => {
    fetch("http://127.0.0.1:8000/auth/verify", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 200) {
        console.log(response);
        setIsLoggedIn(true);
      }
    });
  }, [token]);

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken, userImage, setUserImage }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
