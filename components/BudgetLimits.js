"use client";

import { useState } from "react";
import { useBudget } from "../contexts/BudgetContext";

export function BudgetLimits() {
  const { categories, budgetLimits, setBudgetLimit } = useBudget();
  const [newLimit, setNewLimit] = useState({
    category: categories[0],
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetLimit(newLimit.category, parseFloat(newLimit.amount));
    setNewLimit({ ...newLimit, amount: "" });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Budget Limits</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex items-end space-x-2">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            value={newLimit.category}
            onChange={(e) =>
              setNewLimit({ ...newLimit, category: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Limit Amount
          </label>
          <input
            type="number"
            id="amount"
            value={newLimit.amount}
            onChange={(e) =>
              setNewLimit({ ...newLimit, amount: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Set Limit
        </button>
      </form>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex justify-between items-center">
            <span>{category}</span>
            <span>${budgetLimits[category] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
