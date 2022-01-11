import React, { useEffect, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaExpeditedssl } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { authContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import style from "./login.module.css";

function Login() {
  const { setIsLoggedIn, setToken, setUserImage } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const request = useFetch();
  useEffect(() => {
    document.title = "Login";

    return () => {
      document.title = "";
    };
  }, []);

  const loginHandler = async e => {
    e.preventDefault();
    try {
      const response = await request("http://127.0.0.1:8000/auth/login", {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });

      if (response.status === 401) {
        setErrorMessage(response.message);
      }

      if (response.status === 201) {
        localStorage.setItem("token", response.token);
        const { name, profileImage } = response.data;
        localStorage.setItem("name", name);
        localStorage.setItem(
          "profileImage",
          `http://localhost:8000/images/${profileImage}`
        );
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
        <h2>ERO DATING</h2>
        <label>Login To Your Account</label>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}

        <div>
          <input
            autoComplete="new-password"
            type="text"
            placeholder="Enter your email"
            ref={emailInputRef}
          />
          <MdOutlineMail className={style.icon} />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwordInputRef}
            autoComplete="new-password"
          />
          <FaExpeditedssl className={style.icon} />
        </div>
        <button onClick={loginHandler}>Login</button>

        <span>
          <p className={style.paragraph}>Dont have an account ?</p>
          <Link to="/register">Register now</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
