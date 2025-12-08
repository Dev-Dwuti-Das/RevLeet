import React from "react";

function YellowQstats() {
  return (
    <div
      className="
        bg-[#121212]
        rounded-2xl
        border border-[#1d1d1d]
        p-6
        shadow-[0_0_20px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
      "
    >
      <h1 className="text-xl font-semibold text-white">Almost done</h1>

      <p className="text-4xl font-bold text-yellow-400 mt-3">3 days</p>

      <p className="text-gray-400 text-sm mt-2">
        time remaining
      </p>
    </div>
  );
}

export default YellowQstats;
