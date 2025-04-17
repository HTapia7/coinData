"use client";

export default function WinLossCounter({ wins, setWins, losses, setLosses }) {
  const handleClick = (result) => {
    if (result === "win") {
      setWins(wins + 1);
    } else {
      setLosses(losses + 1);
    }
  };

  const removeWin = () => setWins(prev => (prev > 0 ? prev - 1 : 0));
  const removeLoss = () => setLosses(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Win / Loss Tracker</h2>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Win Box */}
        <div className="bg-green-100/10 border border-green-500 rounded-2xl p-6 w-full md:w-1/2 shadow-md hover:shadow-lg transition text-center">
          <p className="text-lg font-semibold text-green-300">Wins</p>
          <p className="text-3xl font-bold mb-4 text-green-200">{wins}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleClick("win")}
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
            >
              +
            </button>
            <button
              onClick={removeWin}
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition opacity-90"
            >
              −
            </button>
          </div>
        </div>

        {/* Loss Box */}
        <div className="bg-red-100/10 border border-red-500 rounded-2xl p-6 w-full md:w-1/2 shadow-md hover:shadow-lg transition text-center">
          <p className="text-lg font-semibold text-red-300">Losses</p>
          <p className="text-3xl font-bold mb-4 text-red-200">{losses}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleClick("loss")}
              className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
            >
              + 
            </button>
            <button
              onClick={removeLoss}
              className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition opacity-90"
            >
              − 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
