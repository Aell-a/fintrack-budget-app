import { BudgetProvider } from "@/contexts/BudgetContext";
import "./globals.css";
import { Inter } from "next/font/google";
import logo from "@/public/logo.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinTrack",
  description: "Track your income and expenses with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BudgetProvider>
          <header className="bg-blue-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                width={35}
                height={35}
                alt="FinTrack Logo"
                className="w-auto h-auto"
              />
              <h1 className="text-2xl font-bold">FinTrack</h1>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
          <footer className="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 FinTrack</p>
          </footer>
        </BudgetProvider>
      </body>
    </html>
  );
}
