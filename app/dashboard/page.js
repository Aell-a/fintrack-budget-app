"use client";

import { useState } from "react";
import { useBudget } from "../../contexts/BudgetContext";
import { TransactionForm } from "../../components/TransactionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { transactions, removeTransaction, getTotalBalance } = useBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Total Balance: ${getTotalBalance().toFixed(2)}
        </h2>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Transactions</h2>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
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
              {transaction.description} ({transaction.category})
            </div>
            <button
              onClick={() => removeTransaction(transaction.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
