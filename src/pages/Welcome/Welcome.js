import React, { useEffect, Fragment } from "react";
import classes from "./welcome.module.css";
import { Link } from "react-router-dom";
import Question from "../../components/Question/Question";
import data from "./data";
import Comment from "../../components/Comment/Comment";
import comments from "./commentsData";

const Welcome = () => {
  useEffect(() => {
    document.title = "Erodate";

    return () => {
      document.title = "";
    };
  }, []);

  return (
    <Fragment>
      <div className={classes.container}>
        <article className={classes.infoContainer}>
          <h1>ERODATE</h1>
          <p>Start chating today and find your love one for life.</p>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </article>
      </div>
      <article className={classes.questionSection}>
        <h2>FAQ</h2>
        {data.map(element => (
          <Question
            key={element.title}
            title={element.title}
            description={element.description}
          />
        ))}
      </article>
      <div className={classes.titleContainer}>
        <h1>What They Say About Us</h1>
      </div>
      <article className={classes.reviews}>
        {comments.map(e => {
          return (
            <Comment
              key={e.name}
              description={e.description}
              name={e.name}
              img={e.img}
            ></Comment>
          );
        })}
      </article>
    </Fragment>
  );
};

export default Welcome;
