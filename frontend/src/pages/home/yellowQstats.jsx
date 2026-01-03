import React from "react";
function YellowQstats({data}) {
  const safeData = Array.isArray(data) ? data : [];
  const queue_count = safeData.reduce(
    (acc, curr) => {
      if(curr.queue === "Q4")acc.q4++;
      return acc;
    },{q4:0}
  )
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
         <div className="flex justify-between items-center"><h1 className="text-xl font-semibold text-white">Almost done</h1>
      <span
          className="
            text-xs font-semibold
            text-yellow-400/90
            bg-yellow-500/10
            px-3 py-1 rounded-full
          "
        >
        Pending
        </span></div>
      

      <p className="text-4xl font-bold text-yellow-400 mt-3">{queue_count.q4} questions</p>

      <p className="text-gray-400 text-sm mt-2">
        time remaining
      </p>
    </div>
  );
}

export default YellowQstats;
