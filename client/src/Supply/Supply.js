import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import Layout from "../Layout/Layout";
import styles from "./Supply.module.css"; // Import the CSS module

function Supply() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState([]);
  const [MedStage, setMedStage] = useState([]);
  const [ID, setID] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = [];
      const medStage = [];
      for (let i = 0; i < medCtr; i++) {
        const medicine = await supplychain.methods.MedicineStock(i + 1).call();
        med.push(medicine);
        const stage = await supplychain.methods.showStage(i + 1).call();
        medStage.push(stage);
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to the current network");
    }
  };

  const redirect_to_home = () => {
    navigate("/");
  };

  const handlerChangeID = (event) => {
    setID(event.target.value);
  };

  const handleSubmit = async (event, action) => {
    event.preventDefault();
    try {
      let receipt;
      if (action === "RMSsupply") {
        receipt = await SupplyChain.methods
          .RMSsupply(ID)
          .send({ from: currentaccount });
      } else if (action === "Manufacturing") {
        receipt = await SupplyChain.methods
          .Manufacturing(ID)
          .send({ from: currentaccount });
      } else if (action === "Distribute") {
        receipt = await SupplyChain.methods
          .Distribute(ID)
          .send({ from: currentaccount });
      } else if (action === "Retail") {
        receipt = await SupplyChain.methods
          .Retail(ID)
          .send({ from: currentaccount });
      } else if (action === "sold") {
        receipt = await SupplyChain.methods
          .sold(ID)
          .send({ from: currentaccount });
      }

      if (receipt) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  return (
    <Layout>
      <div className={styles.address}>
        <b className={styles.account}>Current Account Address:</b>{" "}
        <span className={styles.accountValue}>{currentaccount}</span>
      </div>
      <div className={styles.container}>
        <h6 className={styles.chainFlow}>
          <b>Supply Chain Flow:</b>
        </h6>
        <p className={styles.flow}>
          Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt;
          Distributor -&gt; Retailer -&gt; Consumer
        </p>
        <table className={`table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">Medicine ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Processing Stage</th>
            </tr>
          </thead>
          <tbody>
            {MED.map((medicine, key) => (
              <tr key={key}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>
          <b>Supply Raw Materials</b>
        </h4>
          (Only a registered Raw Material Supplier can perform this step):-
        <form onSubmit={(e) => handleSubmit(e, "RMSsupply")}>
          <input
            className={`form-control ${styles.formControlSm}`}
            type="text"
            onChange={handlerChangeID}
            placeholder="Enter Medicine ID"
            required
          />
          <button
            className={`btn ${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
            type="submit"
          >
            Supply
          </button>
        </form>
        <br />
        <h4>
          <b>Manufacture</b>
        </h4>
          (Only a registered Manufacturer can perform this step):-
        <form onSubmit={(e) => handleSubmit(e, "Manufacturing")}>
          <input
            className={`form-control ${styles.formControlSm}`}
            type="text"
            onChange={handlerChangeID}
            placeholder="Enter Medicine ID"
            required
          />
          <button
            className={`btn ${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
            type="submit"
          >
            Manufacture
          </button>
        </form>
        <br />
        <h4>
          <b>Distribute</b>
        </h4>
          (Only a registered Distributor can perform this step):-
        <form onSubmit={(e) => handleSubmit(e, "Distribute")}>
          <input
            className={`form-control ${styles.formControlSm}`}
            type="text"
            onChange={handlerChangeID}
            placeholder="Enter Medicine ID"
            required
          />
          <button
            className={`btn ${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
            type="submit"
          >
            Distribute
          </button>
        </form>
        <br />
        <h4>
          <b>Retail</b>
        </h4>
          (Only a registered Retailer can perform this step):-
        <form onSubmit={(e) => handleSubmit(e, "Retail")}>
          <input
            className={`form-control ${styles.formControlSm}`}
            type="text"
            onChange={handlerChangeID}
            placeholder="Enter Medicine ID"
            required
          />
          <button
            className={`btn ${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
            type="submit"
          >
            Retail
          </button>
        </form>
        <br />
        <h4>
          <b>Mark as sold</b>
        </h4>
          (Only a registered Retailer can perform this step):-
        <form onSubmit={(e) => handleSubmit(e, "sold")}>
          <input
            className={`form-control ${styles.formControlSm}`}
            type="text"
            onChange={handlerChangeID}
            placeholder="Enter Medicine ID"
            required
          />
          <button
            className={`btn ${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
            type="submit"
          >
            Sold
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Supply;
