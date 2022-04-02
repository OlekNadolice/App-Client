import { useEffect, useRef } from "react";
import classes from "./welcome.module.css";
import { Link } from "react-router-dom";
import { Question, Comment } from "components/index";
import comments, { data } from "./commentsData";
import { useSpring, animated } from "react-spring";
import { useDocumentTitle, useOnScreen } from "hooks/imports";

const Welcome = () => {
  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  const { setTarget, isVisible } = useOnScreen({ threshold: 0.8 });
  const { setTarget: setObserver, isVisible: visible } = useOnScreen({ threshold: 0.3 });
  const ref = useRef("");
  const containerRef = useRef("");
  useDocumentTitle("Datingify");

  useEffect(() => {
    ref.current && setTarget(ref.current);
    containerRef.current && setObserver(containerRef.current);
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <animated.div style={fadeIn} className={classes.container}>
          <article className={classes.infoContainer}>
            <h1>Datingify</h1>
            <p>Start chating today and find your love one for life.</p>
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </article>
        </animated.div>
      </div>
      <div
        ref={ref}
        className={`${classes.questionSection} ${isVisible && classes.animation} `}
      >
        <h2>FAQ </h2>
        {data.map(element => (
          <Question
            key={element.title}
            title={element.title}
            description={element.description}
          />
        ))}
      </div>
      <div
        ref={containerRef}
        className={`${classes.titleContainer} ${visible && classes.animation2}`}
      >
        <div>
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
              />
            );
          })}
        </article>
      </div>
    </div>
  );
};

export default Welcome;
