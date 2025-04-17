import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from '@/components/Navbar.jsx';

export const metadata = {
  title: 'CoinFlip Tracker',
  description: 'Track your coin flips and win/loss stats',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body
          suppressHydrationWarning
          className="min-h-screen antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
        >
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
