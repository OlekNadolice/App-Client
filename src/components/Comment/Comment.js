import React from "react";
import classes from "./comment.module.css";
const Comment = ({ description, name, img }) => {
  return (
    <div className={classes.reviewsBox}>
      <q>{description}</q>
      <div>
        <h1>{name}</h1>
        <img
          loading="lazy"
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

export default Comment;
