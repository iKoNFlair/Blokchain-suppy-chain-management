import React from "react";
import { connect } from "react-redux"; // Import connect
import styles from "./Header.module.css";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../Actions/navbarActions"; // Import your Redux action

const Header = (props) => {
  const { activePage, setActivePage } = props;
  const navigate = useNavigate();

  const handleNavItemClick = (page) => {
    setActivePage(page); // Dispatch the action to set the active page
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navBar}>
          <div className={styles.title}>
            <FaUserDoctor className={styles.titleIcon} />
            PharmaSync Nexus
          </div>
          <div>
            <ul className={styles.navLinks}>
              <li
                className={`${styles.navItem} ${
                  activePage === "Home" ? styles.active : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Home");
                  navigate("/");
                }}
              >
                Home
              </li>
              <li
                className={`${styles.navItem} ${
                  activePage === "Order" ? styles.active : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Order");
                  navigate("/addmed");
                }}
              >
                Order
              </li>
              <li
                className={`${styles.navItem} ${
                  activePage === "Supply" ? styles.active : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Supply");
                  navigate("/supply");
                }}
              >
                Supply
              </li>
              <li
                className={`${styles.navItem} ${
                  activePage === "Track" ? styles.active : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Track");
                  navigate("/track");
                }}
              >
                Track
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

// Connect the component to Redux store
const mapStateToProps = (state) => ({
  activePage: state.navbar.activePage,
});

const mapDispatchToProps = {
  setActivePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
