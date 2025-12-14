import WaitingQ from "./WaitingQ.jsx";
import YellowQStats from "./yellowQstats.jsx";
import OrangeQstats from "./orangeQstats.jsx";
import QuestionList from "./Question_List";
import HeatmapExample from "./heatmap.jsx";
import DoughnutChart from "./doughnut.jsx";

function Home() {
  return (
    <div className="p-4 min-h-screen text-white w-full">
      
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <OrangeQstats />
            <YellowQStats />
            <WaitingQ/>
          </div>

          <div className="md:col-span-1 w-full">
            <DoughnutChart />
          </div>

          <div className="md:col-span-2 w-full">
            <HeatmapExample />
          </div>

          
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/3">
          <QuestionList />
        </div>
      </div>
    </div>
  );
}

export default Home;
