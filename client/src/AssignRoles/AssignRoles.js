import React, { Component } from "react";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import Layout from "../Layout/Layout";
import styles from "./AssignRoles.module.css";
import classNames from "classnames";

class AssignRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentaccount: "",
      loader: true,
      SupplyChain: null,
      RMSname: "",
      MANname: "",
      DISname: "",
      RETname: "",
      RMSplace: "",
      MANplace: "",
      DISplace: "",
      RETplace: "",
      RMSaddress: "",
      MANaddress: "",
      DISaddress: "",
      RETaddress: "",
      RMS: {},
      MAN: {},
      DIS: {},
      RET: {},
    };
  }

  componentDidMount() {
    this.loadWeb3();
    this.loadBlockchaindata();
  }

  loadWeb3 = async () => {
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

  loadBlockchaindata = async () => {
    this.setState({ loader: true });
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    this.setState({ currentaccount: account });
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      this.setState({ SupplyChain: supplychain });
      var i;
      const roles = ["RMS", "MAN", "DIS", "RET"];
      for (const role of roles) {
        const roleCtr = await supplychain.methods[
          `${role.toLowerCase()}Ctr`
        ]().call();
        const roleData = {};
        for (i = 0; i < roleCtr; i++) {
          roleData[i] = await supplychain.methods[`${role}`](i + 1).call();
        }
        this.setState({ [role]: roleData });
      }
      this.setState({ loader: false });
    } else {
      window.alert("The smart contract is not deployed to the current network");
    }
  };

  redirect_to_home = () => {
    const { navigate } = this.props;
    navigate("/");
  };

  handlerChangeAddress = (event, role) => {
    this.setState({ [role + "address"]: event.target.value });
  };

  handlerChangePlace = (event, role) => {
    this.setState({ [role + "place"]: event.target.value });
  };

  handlerChangeName = (event, role) => {
    this.setState({ [role + "name"]: event.target.value });
  };

  handlerSubmit = async (event, role) => {
    event.preventDefault();
    try {
      const SupplyChain = this.state.SupplyChain;
      const address = this.state[role + "address"];
      const name = this.state[role + "name"];
      const place = this.state[role + "place"];
      const currentaccount = this.state.currentaccount;
      const receipt = await SupplyChain.methods[
        `add${role.charAt(0).toUpperCase() + role.slice(1)}`
      ](address, name, place).send({ from: currentaccount });
      if (receipt) {
        this.loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  renderTable = (roleData) => {
    return (
      <table className={classNames("table", "table-sm", styles.table)}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Place</th>
            <th scope="col">Ethereum Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(roleData).map(function (key) {
            return (
              <tr key={key}>
                <td>{roleData[key].id}</td>
                <td>{roleData[key].name}</td>
                <td>{roleData[key].place}</td>
                <td>{roleData[key].addr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    const {
      RMS,
      MAN,
      DIS,
      RET,
      currentaccount,
      loader,
      RMSname,
      MANname,
      DISname,
      RETname,
      RMSplace,
      MANplace,
      DISplace,
      RETplace,
      RMSaddress,
      MANaddress,
      DISaddress,
      RETaddress,
    } = this.state;

    return (
      <Layout>
        <div className={styles.address}>
          <b className={styles.account}>Current Account Address:</b>{" "}
          <span className={styles.accountValue}>{currentaccount}</span>
        </div>
        <div className={styles.roles}>
          <h4>Raw Material Suppliers:</h4>
          <form
            onSubmit={(e) => this.handlerSubmit(e, "RMS")}
            className={styles.form}
          >
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RMSaddress}
              onChange={(e) => this.handlerChangeAddress(e, "RMS")}
              placeholder="Ethereum Address"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RMSname}
              onChange={(e) => this.handlerChangeName(e, "RMS")}
              placeholder="Raw Material Supplier Name"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RMSplace}
              onChange={(e) => this.handlerChangePlace(e, "RMS")}
              placeholder="Based In"
              required
            />
            <button
              className={classNames("btn", "btn-outline-success", styles.btnSm)}
              onSubmit={(e) => this.handlerSubmit(e, "RMS")}
            >
              Register
            </button>
          </form>
          {this.renderTable(RMS)}
          <h4>Manufacturers:</h4>
          <form
            onSubmit={(e) => this.handlerSubmit(e, "MAN")}
            className={styles.form}
          >
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={MANaddress}
              onChange={(e) => this.handlerChangeAddress(e, "MAN")}
              placeholder="Ethereum Address"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={MANname}
              onChange={(e) => this.handlerChangeName(e, "MAN")}
              placeholder="Manufacturer Name"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={MANplace}
              onChange={(e) => this.handlerChangePlace(e, "MAN")}
              placeholder="Based In"
              required
            />
            <button
              className={classNames("btn", "btn-outline-success", styles.btnSm)}
              onSubmit={(e) => this.handlerSubmit(e, "MAN")}
            >
              Register
            </button>
          </form>
          {this.renderTable(MAN)}
          <h4>Distributors:</h4>
          <form
            onSubmit={(e) => this.handlerSubmit(e, "DIS")}
            className={styles.form}
          >
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={DISaddress}
              onChange={(e) => this.handlerChangeAddress(e, "DIS")}
              placeholder="Ethereum Address"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={DISname}
              onChange={(e) => this.handlerChangeName(e, "DIS")}
              placeholder="Distributor Name"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={DISplace}
              onChange={(e) => this.handlerChangePlace(e, "DIS")}
              placeholder="Based In"
              required
            />
            <button
              className={classNames("btn", "btn-outline-success", styles.btnSm)}
              onSubmit={(e) => this.handlerSubmit(e, "DIS")}
            >
              Register
            </button>
          </form>
          {this.renderTable(DIS)}
          <h4>Retailers:</h4>
          <form
            onSubmit={(e) => this.handlerSubmit(e, "RET")}
            className={styles.form}
          >
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RETaddress}
              onChange={(e) => this.handlerChangeAddress(e, "RET")}
              placeholder="Ethereum Address"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RETname}
              onChange={(e) => this.handlerChangeName(e, "RET")}
              placeholder="Retailer Name"
              required
            />
            <input
              className={classNames("form-control-sm", styles.formControlSm)}
              type="text"
              value={RETplace}
              onChange={(e) => this.handlerChangePlace(e, "RET")}
              placeholder="Based In"
              required
            />
            <button
              className={classNames("btn", "btn-outline-success", styles.btnSm)}
              onSubmit={(e) => this.handlerSubmit(e, "RET")}
            >
              Register
            </button>
          </form>
          {this.renderTable(RET)}
        </div>
      </Layout>
    );
  }
}

export default AssignRoles;
