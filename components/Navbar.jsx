"use client";

import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300"
            >
              CoinFlip Tracker
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Home
              </Link>

              <Link
                href="/counter"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Counter
              </Link>

              {mounted && isLoaded && isSignedIn && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side: Auth buttons */}
          <div className="flex items-center space-x-4">
            {mounted && isLoaded && (
              isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <>
                  <SignInButton>
                    <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 transition duration-300">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <button className="bg-green-600 text-white hover:bg-green-700 rounded-lg px-4 py-2 transition duration-300">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
