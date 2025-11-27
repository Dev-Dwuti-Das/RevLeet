import Stats from "./stats";
import Question_list from "./question_list";

function home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row basis-2/3 border-2 rounded-xl">
          <div className="flex basis-1/2 justify-center  p-5"><Stats></Stats></div>
          <div className="flex basis-1/2 justify-center  p-5"><Stats></Stats></div>
        </div>
        <div className="basis-1/3 flex justify-center">
          <Question_list>cbsacb</Question_list>
        </div>
      </div>
    </>
  );
}

export default home;
