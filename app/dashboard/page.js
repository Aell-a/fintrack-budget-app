"use client";

import { useState } from "react";
import { useBudget } from "../../contexts/BudgetContext";
import { TransactionForm } from "../../components/TransactionForm";
import { BudgetCharts } from "../../components/BudgetCharts";
import { BudgetLimits } from "../../components/BudgetLimits";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Dashboard() {
  const {
    transactions,
    removeTransaction,
    getTotalBalance,
    getMonthlyTransactions,
  } = useBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Report", 14, 12);
    doc.autoTable({
      head: [["Date", "Description", "Amount", "Category", "Type"]],
      body: transactions.map((t) => [
        t.date,
        t.description,
        t.amount,
        t.category,
        t.type,
      ]),
    });
    doc.save("financial-report.pdf");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Total Balance: ${getTotalBalance().toFixed(2)}
        </h2>
      </div>

      <BudgetCharts />

      <div className="mt-8 flex space-x-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
              Add Transaction
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the details of your transaction here.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <button
          onClick={exportToPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Export to PDF
        </button>
      </div>

      <BudgetLimits />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Recent Transactions</h2>
        {getMonthlyTransactions().map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded"
          >
            <div>
              <span
                className={
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </span>{" "}
              {transaction.description}{" "}
              {transaction.type === "expense" && `(${transaction.category})`} -{" "}
              {transaction.date}
            </div>
            <button
              onClick={() => removeTransaction(transaction.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
