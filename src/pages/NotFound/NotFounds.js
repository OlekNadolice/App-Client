import React from "react";
import classes from "./notfounds.module.css";
function NotFounds() {
  return (
    <div className={classes.container}>
      <p>404</p>
      <p className={classes.title}>Page Not Found </p>
    </div>
  );
}

export default NotFounds;
