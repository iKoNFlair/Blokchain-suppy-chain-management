import React from "react";
import styles from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
