"use client";

import { useBudget } from "../contexts/BudgetContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function BudgetCharts() {
  const { getMonthlyTransactions, getCategoryTotals, categories } = useBudget();

  const monthlyTransactions = getMonthlyTransactions();
  const categoryTotals = getCategoryTotals();

  const incomeVsExpenseData = [
    {
      name: "Income",
      value: monthlyTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    },
    {
      name: "Expenses",
      value: monthlyTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    },
  ];

  const categoryData = categories.map((category) => ({
    name: category,
    value: categoryTotals[category] || 0,
  }));

  const COLORS = ["#4CAF50", "#F44336"];
  const categoryColors = categories.map(
    (_, index) => `hsl(${index * 50}, 70%, 50%)`
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Monthly overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeVsExpenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {incomeVsExpenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>Monthly breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <Bar dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index]} />
                  ))}
                </Bar>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
