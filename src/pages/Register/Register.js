import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import classes from "./register.module.css";

function Register() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const request = useFetch();

  const registerHandler = async e => {
    e.preventDefault();
    try {
      const data = await request("http://127.0.0.1:8000/auth/register", {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      if (data.status === 201) {
        setMessage(data.message);
        nameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        setError("");
      } else {
        console.log(data);
        setError(data.output);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Register";
    return () => {
      document.title = "";
    };
  }, []);

  return (
    <form>
      <h2>ERO DATING</h2>
      <label>Creat Account</label>
      {message && <p className={classes.succes}>{message}</p>}
      {error.length > 0 &&
        error.map(e => (
          <p className={classes.error} key={e}>
            {e}
          </p>
        ))}
      <div>
        <input
          type="text"
          autoComplete="new-password"
          placeholder="Enter Your Name"
          ref={nameInputRef}
        />
      </div>
      <div>
        <input
          type="email"
          autoComplete="new-password"
          placeholder="Enter Your Email"
          ref={emailInputRef}
        />
      </div>
      <div>
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Enter Your Password"
          ref={passwordInputRef}
        />
      </div>
      <button onClick={registerHandler}>Create Account</button>
      <span>
        <p className={classes.paragraph}>Already have account ?</p>
        <Link to="/login">Login</Link>
      </span>
    </form>
  );
}

export default Register;
