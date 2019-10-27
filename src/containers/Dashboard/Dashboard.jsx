import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Controls from "../../components/Controls/Controls";
import Balance from "../../components/Balance/Balance";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import styles from "./Dashboard.module.css";
import "react-toastify/dist/ReactToastify.css";

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0
  };

  setLocalStorage = () => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(this.state.transactions)
    );
    localStorage.setItem("balance", JSON.stringify(this.state.balance));
    
  };

  componentDidMount() {
    const transactionStorage = JSON.parse(localStorage.getItem("transactions"));
    const balanceStorage = JSON.parse(localStorage.getItem("balance"));
    if (transactionStorage) {
      this.setState({
        transactions: transactionStorage,
        balance: balanceStorage
      });
    }
  }

  handleTransaction = newTransaction => {
    this.setState(
      prevState => ({
        transactions: [...prevState.transactions, newTransaction],
        balance:
          newTransaction.type === "deposit"
            ? prevState.balance + newTransaction.amount
            : prevState.balance - newTransaction.amount
      }),
      this.setLocalStorage
    );
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls
          balance={balance}
          handleTransaction={this.handleTransaction}
        />
        <ToastContainer />
        <Balance balance={balance} transactions={transactions} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
