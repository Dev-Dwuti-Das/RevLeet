import WaitingQ from "./WaitingQ.jsx";
import YellowQStats from "./yellowQstats.jsx";
import Q2stats from "./Q2stats.jsx";
// import QuestionList from "./Question_List";
import Questionlist from "./question_list.jsx";
import HeatmapExample from "./heatmap.jsx";
import DoughnutChart from "./doughnut.jsx";
import { useEffect, useState } from "react";
import ProgressSummary from "./Progress.jsx";
import axios from "axios";

function Home() {
  const [data, setdata] = useState({});
  async function get_data() {
      try {
        const new_data = await axios.get(
          "http://localhost:3000/api/gethomeinfo",
          {
            withCredentials: true,
          }
        );
        setdata(new_data.data.user_data);
      } catch (err) {
        console.log(err);
      }
    }
  useEffect(() => {
    get_data();
  }, []);

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
            <span className="bg-gray-400/20 text-xs font-semibold rounded-full px-2 py-1 border border-gray-500/35">
              {" "}
              Question List{" "}
            </span>
            <span>→</span>
            <span className="bg-gray-400/20 text-xs bg-purple-500/20 text-purple-500 font-semibold border border-purple-500/25 rounded-full px-2 py-1">
              {" "}
              Waiting Queue 1
            </span>
            <span>→</span>
            <span className="bg-gray-400/20 text-xs font-semibold bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/25 px-2 py-1">
              {" "}
              Vague Queue{" "}
            </span>
            <span>→</span>
            <span className="bg-gray-400/20 text-xs bg-purple-500/20 text-purple-500 font-semibold border border-purple-500/25 rounded-full px-2 py-1">
              {" "}
              Waiting Queue 2{" "}
            </span>
            <span>→</span>
            <span className="bg-gray-400/20 text-xs font-semibold bg-yellow-500/20 text-yellow-400  border border-yellow-500/25 rounded-full px-2 py-1">
              {" "}
              Almost done Queue{" "}
            </span>
            <span>→</span>
            <span className="bg-gray-400/20 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/25 rounded-full px-2 py-1 mt-0">
              {" "}
              done List
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 w-full">
              <DoughnutChart data={data} />
            </div>

            <div className="md:col-span-1 w-full">
              <ProgressSummary data={data} />
            </div>
          </div>

          <div className="md:col-span-2 w-full">
            <HeatmapExample data={data}/>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <Questionlist render={get_data} />
        </div>
      </div>
    </div>
  );
}

export default Home;
