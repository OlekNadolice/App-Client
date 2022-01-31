import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "context/AuthContext";
import ClipLoader from "react-spinners/CircleLoader";
import classes from "./oAuthVerification.module.css";

const OAuthVerificationPage = () => {
  const { setIsLoggedIn, setUserImage } = useContext(authContext);
  let { token, id, name, profileImage } = useParams();

  const values = { token, id, name, profileImage };

  useEffect(() => {
    Object.entries(values).forEach(element => {
      element[0] === "profileImage" && (element[1] = atob(element[1]));
      localStorage.setItem(`${element[0]}`, `${element[1]}`);
    }, []);
    setUserImage(localStorage.getItem("profileImage"));
    setIsLoggedIn(true);
  }, []);
  return (
    <div className={classes.container}>
      <ClipLoader color={"#800"} loading={"true"} size={"100px"} />
    </div>
  );
};

export default OAuthVerificationPage;
