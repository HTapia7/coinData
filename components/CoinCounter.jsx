"use client";

import Image from "next/image";
import HeadsIcon from "@/assets/headsicon.png";
import TailsIcon from "@/assets/tailsicon.png";

export default function CoinCounter({ heads, setHeads, tails, setTails }) {
  const handleHeads = () => setHeads(heads + 1);
  const handleTails = () => setTails(tails + 1);
  const removeHead = () => setHeads(prev => (prev > 0 ? prev - 1 : 0));
  const removeTails = () => setTails(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Coin Counter</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Heads Card */}
        <div className="bg-green-100/10 border border-green-500 rounded-2xl p-6 w-full md:w-1/2 shadow-md hover:shadow-lg transition text-center">
          <button onClick={handleHeads} className="w-full focus:outline-none">
            <Image
              src={HeadsIcon}
              alt="Heads"
              width={120}
              height={120}
              className="mx-auto mb-4 hover:scale-105 transition-transform duration-200"
            />
          </button>
          <p className="text-lg font-semibold text-green-300">Heads</p>
          <p className="text-3xl font-bold mb-4">{heads}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleHeads}
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
            >
              + 
            </button>
            <button
              onClick={removeHead}
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition opacity-90"
            >
              −
            </button>
          </div>
        </div>

        {/* Tails Card */}
        <div className="bg-red-100/10 border border-red-500 rounded-2xl p-6 w-full md:w-1/2 shadow-md hover:shadow-lg transition text-center">
          <button onClick={handleTails} className="w-full focus:outline-none">
            <Image
              src={TailsIcon}
              alt="Tails"
              width={120}
              height={120}
              className="mx-auto mb-4 hover:scale-105 transition-transform duration-200"
            />
          </button>
          <p className="text-lg font-semibold text-red-300">Tails</p>
          <p className="text-3xl font-bold mb-4">{tails}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTails}
              className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
            >
              + 
            </button>
            <button
              onClick={removeTails}
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
