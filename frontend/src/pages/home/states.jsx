import React from "react";
import RedQstats from "./redQstats";
import OrangeQstats from "./orangeQstats";
import YellowQstats from "./yellowQstats";

function StatsGrid() {
  return (
    <div className="w-full bg-[#111] flex justify-center py-12 px-6 text-white">
      <div className="w-full max-w-6xl">

        <h1 className="text-center text-3xl mb-8 font-semibold tracking-wide">
          My Queue Status
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <RedQstats />
          <OrangeQstats />
          <YellowQstats />
        </div>

      </div>
    </div>
  );
}

export default StatsGrid;
