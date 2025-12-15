import React from "react";

function WaitingQ() {
  return (
    <div
      className="
        bg-[#121212]
        rounded-3xl
        border border-[#1d1d1d]
        p-6
        shadow-[0_0_20px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
         
      "
    >
      <div className="flex justify-between items-center"> <h1 className="text-xl font-semibold ">Waiting 1</h1>
      <span
          className="
            text-xs font-semibold
            text-purple-500/90
            bg-purple-500/10
            px-3 py-1 rounded-full
          "
        >
        Waiting
        </span></div>

      

      <p className="text-4xl font-bold text-purple-500/90 opacity-75 mt-3">3 questions</p>

      <p className="text-gray-400 text-sm mt-2">
        7 days buffer 
      </p>
    </div>
  );
}

export default WaitingQ;
