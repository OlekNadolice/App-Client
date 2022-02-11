import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "context/AuthContext";
import { useFetch, useDocumentTitle } from "hooks/imports";
import style from "./login.module.css";

import { FcGoogle } from "react-icons/fc";
export function Login() {
  const { setIsLoggedIn, setToken, setUserImage } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const request = useFetch();
  useDocumentTitle("Login");

  const loginHandler = async e => {
    e.preventDefault();
    try {
      const response = await request("auth/login", {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });

      if (response.status === 401) setErrorMessage(response.message);

      if (response.status === 201) {
        const { name, profileImage, id } = response.data;
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", name);
        localStorage.setItem(
          "profileImage",
          `${process.env.REACT_APP_BACKEND_URL}images/${profileImage}`
        );
        localStorage.setItem("id", id);
        setToken(response.token);
        setIsLoggedIn(true);
        setUserImage(localStorage.getItem("profileImage"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <form>
        <h2>Datingify</h2>

        {errorMessage && <p className={style.error}>Invalid Credentials !</p>}

        <div>
          <label>Email</label>
          <input autoComplete="new-password" type="text" ref={emailInputRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef} autoComplete="new-password" />
        </div>
        <button onClick={loginHandler}>Login</button>
        <button className={style.facebookBtn}>
          <FcGoogle className={style.iconGoogle} />
          <a href={`${process.env.REACT_APP_BACKEND_URL}auth/google`}>
            Sign in with Google
          </a>
        </button>

        <span>
          <p className={style.paragraph}>Dont have an account ?</p>
          <Link to="/register">Register now</Link>
        </span>
      </form>
    </div>
  );
}
