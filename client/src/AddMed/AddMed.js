import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import styles from "./AddMed.module.css";
import Layout from "../Layout/Layout";

function AddMed() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState([]);
  const [MedName, setMedName] = useState("");
  const [MedDes, setMedDes] = useState("");
  const [MedStage, setMedStage] = useState([]); // Define MedStage state

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
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = [];
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
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

  if (loader) {
    return (
      <div>
        <h1 className={styles.wait}>Loading...</h1>
      </div>
    );
  }

  const redirect_to_home = () => {
    navigate("/");
  };

  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };

  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };

  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      const receipt = await SupplyChain.methods
        .addMedicine(MedName, MedDes)
        .send({ from: currentaccount });
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
      <div className={styles.addMed}>
        <br />
        <h4>Add Medicine Order:</h4>
        <form onSubmit={handlerSubmitMED}>
          <input
            className={`${styles.formControlSm} form-control-sm`}
            type="text"
            onChange={handlerChangeNameMED}
            placeholder="Medicine Name"
            required
          />
          <input
            className={`${styles.formControlSm} form-control-sm`}
            type="text"
            onChange={handlerChangeDesMED}
            placeholder="Medicine Description"
            required
          />
          <button
            className={`${styles.btnOutlineSuccess} btn-sm`}
            onSubmit={handlerSubmitMED}
          >
            Order
          </button>
        </form>
        <br />
        <h5>Ordered Medicines:</h5>
        <table className={`${styles.table} table-bordered`}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {MED.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>{MedStage[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AddMed;
