"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

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
  const [budgetLimits, setBudgetLimits] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    const storedBudgetLimits = localStorage.getItem("budgetLimits");
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    if (storedBudgetLimits) {
      setBudgetLimits(JSON.parse(storedBudgetLimits));
    }
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budgetLimits", JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      { ...newTransaction, id: Date.now() },
      ...prevTransactions,
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

  const getMonthlyTransactions = () => {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    return transactions
      .filter((transaction) => {
        const transactionDate = dayjs(transaction.date);
        return (
          transactionDate.month() === currentMonth &&
          transactionDate.year() === currentYear
        );
      })
      .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  };

  const getCategoryTotals = () => {
    return categories.reduce((totals, category) => {
      totals[category] = transactions
        .filter((t) => t.category === category && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      return totals;
    }, {});
  };

  const setBudgetLimit = (category, amount) => {
    setBudgetLimits((prev) => ({ ...prev, [category]: amount }));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        categories,
        budgetLimits,
        darkMode,
        addTransaction,
        removeTransaction,
        getTotalBalance,
        getMonthlyTransactions,
        getCategoryTotals,
        setBudgetLimit,
        toggleDarkMode,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
