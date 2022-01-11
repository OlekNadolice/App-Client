import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import styles from "./header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Header() {
  const { setIsLoggedIn, setToken, userImage } = useContext(authContext);
  const userName = localStorage.getItem("name");
  const [active, setActive] = useState(false);
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

      {!active ? (
        <GiHamburgerMenu className={styles.iconMenu} onClick={() => setActive(!active)} />
      ) : (
        <IoMdClose className={styles.iconMenu} onClick={() => setActive(!active)} />
      )}
      <nav className={active ? styles.isActive : styles.notActive}>
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
