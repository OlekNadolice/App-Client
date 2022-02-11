import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { authContext } from "context/AuthContext";
import styles from "./header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { Modal, FriendsRequest } from "components/index";

export function Header() {
  const { setIsLoggedIn, setToken, userImage, socket } = useContext(authContext);
  const userName = localStorage.getItem("name");
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    socket.disconnect();
    localStorage.clear();
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.profileInfo}>
        <img src={userImage && userImage} alt="person" className={styles.profileImage} />
        <h3 className={styles.profileInfo__title}>{userName}</h3>
      </div>

      <div className={styles.headerRight}>
        <section className={styles.iconSections}>
          {!active ? (
            <GiHamburgerMenu
              className={styles.iconMenu}
              onClick={() => setActive(!active)}
            />
          ) : (
            <IoMdClose className={styles.iconMenu} onClick={() => setActive(!active)} />
          )}
          <FaUserFriends className={styles.iconFriends} onClick={() => setIsOpen(true)} />
          <Link className={styles.iconMessenger} to="/chat">
            <RiMessengerLine />
          </Link>
        </section>
        <nav className={active ? styles.isActive : styles.notActive}>
          <NavLink
            onClick={() => active && setActive(false)}
            to="/home"
            className={props => (props.isActive ? styles.active : null)}
          >
            Home
          </NavLink>

          <NavLink
            to="/settings"
            className={props => (props.isActive ? styles.active : null)}
            onClick={() => active && setActive(false)}
          >
            Settings
          </NavLink>

          <button className={styles.btn} onClick={logoutHandler}>
            Logout
          </button>
        </nav>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Friends Requests">
        <FriendsRequest />
      </Modal>
    </header>
  );
}
