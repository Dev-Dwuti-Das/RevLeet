import RedQstats from "./redQstats.jsx";
import YellowQStats from "./yellowQstats.jsx";
import OrangeQstats from "./orangeQstats.jsx";
import QuestionList from "./Question_List";

function Home() {
  return (
    <div className="p-4 min-h-screen text-white">

      
      <div className="flex flex-col lg:flex-row gap-4 w-full">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-2/3">

          {/* GRID OF CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <RedQstats />
            <OrangeQstats />
            <YellowQStats />
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
