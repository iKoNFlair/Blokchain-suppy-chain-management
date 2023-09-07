import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer>
        <p>
          Made with <AiFillHeart className={styles.heart}/> by Adarsh
        </p>
      </footer>
    </>
  );
};

export default Footer;
