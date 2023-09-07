import React from "react";
import { connect } from "react-redux"; // Import connect
import Layout from "../Layout/Layout";
import styles from "./Home.module.css";
import { setActivePage } from "../Actions/navbarActions"; // Import your Redux action
import { useNavigate } from "react-router-dom";

function Home(props) {
  const { activePage, setActivePage } = props;
  const navigate = useNavigate();

  const redirectToRoles = () => {
    setActivePage("Home"); // Dispatch thea action to set the active page
    navigate("/roles"); // Assuming you have 'navigate' from 'react-router-dom'
  };

  const redirectToAddMed = () => {
    setActivePage("Order"); // Dispatch the action to set the active page
    navigate("/addmed"); // Assuming you have 'navigate' from 'react-router-dom'
  };

  const redirectToSupply = () => {
    setActivePage("Supply"); // Dispatch the action to set the active page
    navigate("/supply"); // Assuming you have 'navigate' from 'react-router-dom'
  };

  const redirectToTrack = () => {
    setActivePage("Track"); // Dispatch the action to set the active page
    navigate("/track"); // Assuming you have 'navigate' from 'react-router-dom'
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h3 className={styles.heading}>Pharmaceutical Supply Chain Flow</h3>

        <div className={styles["action-container"]}>
          <div className={styles.action}>
            <h5>
              Register Raw Material Suppliers, Manufacturers, Distributors, and
              Retailers
            </h5>
            <button
              onClick={redirectToRoles}
              className={`${styles.btn} ${styles["primary-btn"]}`}
            >
              Register
            </button>
          </div>

          <div className={styles.action}>
            <h5>Order Medicines</h5>
            <button
              onClick={redirectToAddMed}
              className={`${styles.btn} ${styles["primary-btn"]}`}
            >
              Order Medicines
            </button>
          </div>

          <div className={styles.action}>
            <h5>Control Supply Chain</h5>
            <button
              onClick={redirectToSupply}
              className={`${styles.btn} ${styles["primary-btn"]}`}
            >
              Control Supply Chain
            </button>
          </div>
        </div>

        <hr />

        <div className={styles["track-action"]}>
          <h5>Track the medicines:</h5>
          <button
            onClick={redirectToTrack}
            className={`${styles.btn} ${styles["outline-btn"]}`}
          >
            Track Medicines
          </button>
        </div>
      </div>
    </Layout>
  );
}

// Connect the component to Redux store
const mapStateToProps = (state) => ({
  activePage: state.navbar.activePage,
});

const mapDispatchToProps = {
  setActivePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
