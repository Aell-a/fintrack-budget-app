"use client";

import { useState } from "react";
import { useBudget } from "../contexts/BudgetContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function TransactionForm({ onClose }) {
  const { addTransaction, categories } = useBudget();
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: categories[0],
    date: new Date(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: format(newTransaction.date, "yyyy-MM-dd"),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, amount: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={newTransaction.type}
          onValueChange={(value) =>
            setNewTransaction({ ...newTransaction, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {newTransaction.type === "expense" && (
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={newTransaction.category}
            onValueChange={(value) =>
              setNewTransaction({ ...newTransaction, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !newTransaction.date && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newTransaction.date ? (
                format(newTransaction.date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={newTransaction.date}
              onSelect={(date) =>
                setNewTransaction({
                  ...newTransaction,
                  date: date || new Date(),
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
}
