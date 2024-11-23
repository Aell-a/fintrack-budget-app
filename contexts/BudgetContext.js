"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState([
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Other",
  ]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...newTransaction, id: Date.now() },
    ]);
  };

  const removeTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "income"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        categories,
        addTransaction,
        removeTransaction,
        getTotalBalance,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
