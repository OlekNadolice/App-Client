import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch, useDocumentTitle } from "hooks/imports";
import classes from "./register.module.css";
import { MdDone } from "react-icons/md";

export function Register() {
  const [error, setError] = useState([]);
  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const request = useFetch();
  const [isValidForm, setIsValidForm] = useState(false);
  useDocumentTitle("Register");

  const registerHandler = async e => {
    try {
      e.preventDefault();
      const data = await request("/auth/register", {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });

      (data.status === 201 && setIsValidForm(true)) || setError(data.output);
    } catch (err) {
      console.log(err);
    }
  };

  if (isValidForm) {
    return (
      <div className={classes.container}>
        <div className={classes.thankYou}>
          <MdDone className={classes.successIcon} />
          <h2>Thanks for registration in our application !</h2>

          <Link to="/login">Click here to login</Link>
        </div>
      </div>
    );
  }

  return (
    <form>
      <h2>Datingify</h2>

      <div>
        <label>Name</label>
        <input type="text" autoComplete="new-password" ref={nameInputRef} />
        {error && (
          <span className={classes.error}>
            {error.find(e => e === "Name  field cant be empty!")}
          </span>
        )}
      </div>
      <div>
        <label>Email</label>
        <input type="email" autoComplete="new-password" ref={emailInputRef} />
        {error && (
          <span className={classes.error}>
            {error.find(e => e === "Email must be a valid email!")}
          </span>
        )}
      </div>
      <div>
        <label>Password</label>
        <input type="password" autoComplete="new-password" ref={passwordInputRef} />
        {error && (
          <span className={classes.error}>
            {error.find(e => e === "Password length minimum 6 characters!")}
          </span>
        )}
      </div>
      <button onClick={registerHandler}>Create account</button>
      <span>
        <p className={classes.paragraph}>Already have account ?</p>
        <Link to="/login">Login</Link>
      </span>
    </form>
  );
}
