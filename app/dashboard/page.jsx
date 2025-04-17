"use client"
import { useAuth } from '@clerk/nextjs';
import CoinTossPieChart from "@/components/CoinTossPieChart";
import WinLossChart from "@/components/WinLossPieChart";
import TableData from "@/components/TableData.jsx";
import BarChart from "@/components/BarChart.jsx";

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth();

  // Show a loading spinner or redirect to a login page if auth is not loaded
  if (!isLoaded) return <div>Loading...</div>;

  // If no user is logged in, redirect to the sign-in page
  if (!userId) {
    return <div>Please log in to access the dashboard</div>;
    // Or use a redirect to a sign-in page if needed, like `useRouter().push('/sign-in')`
  }

  return (
    <div className="p-6 md:p-8 space-y-10">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Coin Toss Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-6 flex flex-col justify-between h-[432px] px-4">
          <h2 className="mb-6 text-xl font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide text-left">
            Head / Tails
          </h2>
          <div className="flex justify-center flex-1 w-full">
            <CoinTossPieChart />
          </div>
        </div>

        {/* Win/Loss Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-6 flex flex-col justify-between h-[432px] px-4">
          <h2 className="mb-6 text-xl font-bold text-green-600 dark:text-green-400 uppercase tracking-wide text-left">
            Win / Loss
          </h2>
          <div className="flex justify-center flex-1 w-full">
            <WinLossChart />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-6 flex flex-col justify-between h-[432px] px-4 col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="mb-6 text-xl font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide text-center">
            Coin Toss & Win/Loss Comparison
          </h2>
          <div className="flex justify-center flex-1 w-full">
            <BarChart />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <TableData />
      </div>
    </div>
  );
}
