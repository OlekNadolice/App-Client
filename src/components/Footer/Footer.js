import React from "react";
import styles from "./footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return <footer className={styles.footer}>Datingify & {year}</footer>;
}

export default Footer;
