import YellowQStats from "./yellowQstats.jsx";
import Q2stats from "./Q2stats.jsx";
// import QuestionList from "./Question_List";
import Questionlist from "./question_list.jsx";
import HeatmapExample from "./heatmap.jsx";
import DoughnutChart from "./doughnut.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import ProgressSummary from "./Progress.jsx";
import axios from "axios";

function Home() {
  const [data, setdata] = useState({});
  const [stats, setStats] = useState({});
  async function getData() {
      try {
        const new_data = await axios.get("/api/gethomeinfo", {
          withCredentials: true,
        });
        setdata(new_data.data.user_data);
        setStats(new_data.data.stats || {});
      } catch (err) {
        console.log(err);
      }
    }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    get_data();
  }, [get_data]);

  return (
    <div className="p-4  pt-1 min-h-screen text-white w-full m-0 relative">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* <WaitingQ/>  */}
            <Q2stats data={data} />
            {/* <WaitingQ/>  */}
            <YellowQStats data={data} />
          </div>

          <div className="w-full mb-1 flex items-center justify-center space-x-2">
            <span className="bg-white/5 text-zinc-300 text-xs font-semibold rounded-full px-2 py-1 border border-white/15">
              {" "}
              Question List{" "}
            </span>
            <span className="text-zinc-500">→</span>
            <span className="bg-purple-500/20 text-xs text-purple-200 font-semibold border border-purple-400/30 rounded-full px-2 py-1">
              {" "}
              Buffer 1
            </span>
            <span className="text-zinc-500">→</span>
            <span className="text-xs font-semibold bg-orange-500/20 text-orange-200 rounded-full border border-orange-400/30 px-2 py-1">
              {" "}
              Warm{" "}
            </span>
            <span className="text-zinc-500">→</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-200 font-semibold border border-indigo-400/30 rounded-full px-2 py-1">
              {" "}
              Buffer 2{" "}
            </span>
            <span className="text-zinc-500">→</span>
            <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-200 border border-yellow-400/30 rounded-full px-2 py-1">
              {" "}
              Almost done {" "}
            </span>
            <span className="text-zinc-500">→</span>
            <span className="text-xs font-semibold bg-green-500/20 text-green-200 border border-green-400/30 rounded-full px-2 py-1 mt-0">
              {" "}
              done List
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 w-full">
              <DoughnutChart data={data} />
             

            </div>

            <div className="md:col-span-1 w-full">
              <ProgressSummary data={data} stats={stats} />
            </div>
          </div>

          <div className="md:col-span-2 w-full">
            <HeatmapExample data={data}/>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <Questionlist render={getData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
