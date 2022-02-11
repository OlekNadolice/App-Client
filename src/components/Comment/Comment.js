import React from "react";
import classes from "./comment.module.css";
export const Comment = ({ description, name, img }) => {
  return (
    <div className={classes.reviewsBox}>
      <q>{description}</q>
      <div>
        <h1>{name}</h1>
        <img
          width={"50px"}
          height={"50px"}
          src={img}
          className={classes.reviewsBoxImg}
          alt=""
        />
      </div>
    </div>
  );
};
