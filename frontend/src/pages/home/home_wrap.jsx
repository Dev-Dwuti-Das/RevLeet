import RedQstats from "./redQstats.jsx";
import YellowQStats from "./yellowQstats.jsx";
import OrangeQstats from "./orangeQstats.jsx";
import QuestionList from "./Question_List";

function Home() {
  return (
    <div className="flex flex-row gap-4 p-4 min-h-screen text-white">

      <div className="flex flex-col basis-2/3 gap-4">
        <div className="flex gap-4">
          <div className="basis-1/2">
            <RedQstats></RedQstats>
          </div>
          <div className="basis-1/2">
          <OrangeQstats></OrangeQstats>
          </div>
          <div className="basis-1/2">
          <YellowQStats></YellowQStats>
            
          </div>
        </div>
      </div>
      

      <div className="basis-1/3">
        <QuestionList />
      </div>
    </div>
  );
}

export default Home;
