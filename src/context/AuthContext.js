import React, { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";

export const authContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [userImage, setUserImage] = useState(localStorage.getItem("profileImage"));
  const server = process.env.REACT_APP_BACKEND_URL;
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      setSocket(
        io(server, {
          query: {
            user: localStorage.getItem("id"),
          },
          autoConnect: false,
        })
      );
    }
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
        setSocket,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
