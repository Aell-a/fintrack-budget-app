"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { BudgetProvider, useBudget } from "../contexts/BudgetContext";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }) {
  const { darkMode, toggleDarkMode } = useBudget();

  return (
    <body className={`${inter.className} ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="bg-blue-500 dark:bg-blue-800 p-4 text-white flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">FinTrack</h1>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-600 dark:bg-blue-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center">
          <p>&copy; 2024 FinTrack</p>
        </footer>
      </div>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <BudgetProvider>
        <AppContent>{children}</AppContent>
      </BudgetProvider>
    </html>
  );
}
