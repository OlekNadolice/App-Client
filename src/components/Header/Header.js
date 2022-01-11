import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import styles from "./header.module.css";

function Header() {
  const { setIsLoggedIn, setToken, userImage } = useContext(authContext);
  const userName = localStorage.getItem("name");
  // const userImage = localStorage.getItem("profileImage");
  const logoutHandler = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("profileImage");
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.profileInfo}>
        <img src={userImage && userImage} alt="person" className={styles.profileImage} />
        <h3 className={styles.profileInfo__title}>{userName}</h3>
      </div>
      <nav>
        <NavLink to="/home" className={props => (props.isActive ? styles.active : null)}>
          Home
        </NavLink>

        <NavLink
          to="/settings"
          className={props => (props.isActive ? styles.active : null)}
        >
          Settings
        </NavLink>

        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
