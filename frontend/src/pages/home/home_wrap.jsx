import YellowQStats from "./yellowQstats.jsx";
import Q2stats from "./Q2stats.jsx";
import Questionlist from "./question_list.jsx";
import HeatmapExample from "./heatmap.jsx";
import DoughnutChart from "./doughnut.jsx";
import ProgressSummary from "./Progress.jsx";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setdata] = useState({});
  const [stats, setStats] = useState({});

  // ✅ memoized function (important since passed to child)
  const getData = useCallback(async () => {
    try {
      const res = await axios.get("/api/gethomeinfo", {
        withCredentials: true,
      });

      setdata(res.data.user_data || {});
      setStats(res.data.stats || {});
    } catch (err) {
      console.error("Error fetching home data:", err);
    }
  }, []);

  // ✅ single clean fetch
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="p-4 pt-1 min-h-screen text-white w-full m-0 relative">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Q2stats data={data} />
            <YellowQStats data={data} />
          </div>

          {/* Flow Indicator */}
          <div className="w-full mb-1 flex items-center justify-center space-x-2 flex-wrap text-center">
            <span className="bg-gray-400/20 text-xs font-semibold rounded-full px-2 py-1 border border-gray-500/35">
              Question List
            </span>
            <span>→</span>

            <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold border border-purple-500/25 rounded-full px-2 py-1">
              Waiting Queue 1
            </span>
            <span>→</span>

            <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold border border-orange-500/25 rounded-full px-2 py-1">
              Vague Queue
            </span>
            <span>→</span>

            <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold border border-purple-500/25 rounded-full px-2 py-1">
              Waiting Queue 2
            </span>
            <span>→</span>

            <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold border border-yellow-500/25 rounded-full px-2 py-1">
              Almost Done Queue
            </span>
            <span>→</span>

            <span className="bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/25 rounded-full px-2 py-1">
              Done List
            </span>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <DoughnutChart data={data} />
            </div>

            <div className="w-full">
              <ProgressSummary data={data} stats={stats} />
            </div>
          </div>

          {/* Heatmap */}
          <div className="w-full">
            <HeatmapExample data={data} streak={Number(stats?.streak ?? 0)} />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/3">
          <Questionlist render={getData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
