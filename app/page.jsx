import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* App Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
          CoinFlip Tracker
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Visualize your coin tosses and track wins and losses with clarity. Simple. Fast. Effective.
        </p>

        {/* Action Button */}
        <a
          href="/counter"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </main>
  );
}
