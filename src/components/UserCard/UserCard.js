import React from "react";
import { Link } from "react-router-dom";

import styles from "./usercard.module.css";

const UserCard = ({ name, age, city, profileImage, id }) => {
  return (
    <article className={styles.card}>
      <img src={profileImage} className={styles.userImage} alt="" />
      <section>
        <h1 className={styles.cardName}>{name}</h1>
        <h2 className={styles.cardInfo}>
          {city} {age}
        </h2>

        <Link className={styles.link} to={`/users/${id}`}>
          More...
        </Link>
      </section>
    </article>
  );
};

export default UserCard;
