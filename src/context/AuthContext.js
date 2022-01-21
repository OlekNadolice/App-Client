import React, { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
export const authContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [userImage, setUserImage] = useState(localStorage.getItem("profileImage"));

  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(
      io("http://127.0.0.1:8000", {
        query: {
          user: localStorage.getItem("id"),
        },
        autoConnect: false,
      })
    );
  }, [isLoggedIn]);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userImage,
        setUserImage,
        socket,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
