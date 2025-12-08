import RedQstats from "./redQstats.jsx";
import YellowQStats from "./yellowQstats.jsx";
import OrangeQstats from "./orangeQstats.jsx";
import QuestionList from "./Question_List";
import HeatmapExample from "./heatmap.jsx";
import DoughnutChart from "./doughnut.jsx";

function Home() {
  return (
    <div className="p-4 min-h-screen text-white">

      
      <div className="flex flex-col lg:flex-row gap-4 w-full">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-2/3">

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <RedQstats />
            <OrangeQstats />
            <YellowQStats />
          </div>
          <div className="mt-5 flex-row">
            <HeatmapExample></HeatmapExample>
            <DoughnutChart></DoughnutChart>
          </div>

        </div>

       
        <div className="w-full lg:w-1/3">
          <QuestionList />
        </div>

      </div>
    </div>
  );
}

export default Home;
