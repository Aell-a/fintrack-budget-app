import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to FinTrack</h1>
      <p className="mb-4 text-xl">Start managing your finances today!</p>
      <Link
        href="/dashboard"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
